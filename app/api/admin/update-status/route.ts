import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const secret = formData.get("secret") as string;
  const orderId = formData.get("orderId") as string;
  const status = formData.get("status") as string;

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allowedStatuses = ["printing", "shipped"];
  if (!allowedStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const updateData: Record<string, unknown> = { status };
  if (status === "shipped") updateData.shipped_at = new Date().toISOString();

  await supabase.from("orders").update(updateData).eq("id", orderId);

  // 発送時にユーザーへメール通知
  if (status === "shipped" && process.env.RESEND_API_KEY) {
    const { data: order } = await supabase.from("orders").select("email, child_name, title").eq("id", orderId).single();
    if (order?.email) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "えほんのほし <noreply@ehon-no-hoshi.jp>",
          to: order.email,
          subject: `【えほんのほし】${order.child_name}の絵本を発送しました`,
          html: `
            <h2>絵本を発送しました 📖</h2>
            <p>「${order.title ?? `${order.child_name}の物語`}」を発送しました。</p>
            <p>到着まで今しばらくお待ちください。</p>
            <br>
            <p>えほんのほし</p>
          `,
        }),
      });
    }
  }

  return NextResponse.redirect(new URL("/admin", req.url));
}
