import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const PAYJP_API = "https://api.pay.jp/v1";
const AMOUNT = 4980;

function auth() {
  return "Basic " + Buffer.from(process.env.PAYJP_SECRET_KEY! + ":").toString("base64");
}

export async function POST(req: NextRequest) {
  const { token, orderId } = await req.json();
  if (!token || !orderId) {
    return NextResponse.json({ error: "パラメータが不足しています" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // 注文確認
  const { data: order } = await supabase
    .from("orders")
    .select("id, email, status, amount")
    .eq("id", orderId)
    .single();

  if (!order) return NextResponse.json({ error: "注文が見つかりません" }, { status: 404 });
  if (order.status !== "preview") return NextResponse.json({ error: "この注文はすでに処理済みです" }, { status: 400 });

  try {
    // PAY.JP 一回払いチャージ
    const chargeRes = await fetch(`${PAYJP_API}/charges`, {
      method: "POST",
      headers: {
        Authorization: auth(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        card: token,
        amount: String(order.amount ?? AMOUNT),
        currency: "jpy",
        description: `えほんのほし 注文ID: ${orderId}`,
        capture: "true",
      }).toString(),
    });

    const charge = await chargeRes.json();
    if (charge.error) {
      return NextResponse.json({ error: charge.error.message }, { status: 400 });
    }

    // DBを更新
    await supabase
      .from("orders")
      .update({ status: "paid", payjp_charge_id: charge.id })
      .eq("id", orderId);

    // 管理者通知メール
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "えほんのほし <noreply@ehon-no-hoshi.jp>",
          to: process.env.ADMIN_EMAIL,
          subject: `【えほんのほし】新規注文 ¥${(order.amount ?? AMOUNT).toLocaleString()}`,
          html: `
            <h2>新規注文が入りました</h2>
            <p><strong>注文ID:</strong> ${orderId}</p>
            <p><strong>金額:</strong> ¥${(order.amount ?? AMOUNT).toLocaleString()}</p>
            <p><strong>メール:</strong> ${order.email}</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://ehon-no-hoshi.vercel.app"}/admin">管理画面で確認する</a></p>
          `,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "決済処理に失敗しました" }, { status: 500 });
  }
}
