import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, email, child_name, address_name, postal_code, address, status, amount, created_at")
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  const header = ["order_id", "email", "宛名", "郵便番号", "住所", "金額", "注文日"];
  const rows = (orders ?? []).map((o) => [
    o.id,
    o.email,
    o.address_name,
    o.postal_code,
    o.address,
    o.amount,
    new Date(o.created_at).toLocaleDateString("ja-JP"),
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="ehon_orders_${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
