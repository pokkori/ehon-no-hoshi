import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSecret = cookieStore.get("admin_secret")?.value;
  if (adminSecret !== process.env.CRON_SECRET) redirect("/");

  const supabase = getSupabaseAdmin();
  const [{ count: paidCount }, { count: printingCount }, { data: recentOrders }] =
    await Promise.all([
      supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "paid"),
      supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "printing"),
      supabase.from("orders").select("id, email, child_name, theme, status, amount, created_at, postal_code, address, address_name")
        .order("created_at", { ascending: false }).limit(30),
    ]);

  const csvUrl = `/api/admin/export?secret=${process.env.CRON_SECRET}`;

  return (
    <main className="min-h-screen" style={{ background: "#fdf8ff" }}>
      <header className="border-b border-violet-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-violet-900">📖 えほんのほし 管理画面</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-violet-100 p-5 text-center">
            <p className="text-3xl font-black text-violet-950">{paidCount ?? 0}</p>
            <p className="text-xs text-gray-500 mt-1">注文済み（製本待ち）</p>
          </div>
          <div className="bg-white rounded-xl border border-violet-100 p-5 text-center">
            <p className="text-3xl font-black text-violet-950">{printingCount ?? 0}</p>
            <p className="text-xs text-gray-500 mt-1">製本中</p>
          </div>
          <div className="bg-violet-500 rounded-xl p-5 text-center">
            <a href={csvUrl} className="text-white font-bold text-sm block mt-2">CSVダウンロード</a>
            <p className="text-xs text-violet-100 mt-1">しまうま出版入稿用</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-violet-100 p-6">
          <h2 className="font-black text-violet-950 mb-4">注文一覧</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-violet-100">
                  <th className="text-left py-2 px-2 font-bold text-violet-700">日時</th>
                  <th className="text-left py-2 px-2 font-bold text-violet-700">メール</th>
                  <th className="text-left py-2 px-2 font-bold text-violet-700">子供名</th>
                  <th className="text-left py-2 px-2 font-bold text-violet-700">テーマ</th>
                  <th className="text-left py-2 px-2 font-bold text-violet-700">住所</th>
                  <th className="text-left py-2 px-2 font-bold text-violet-700">金額</th>
                  <th className="text-left py-2 px-2 font-bold text-violet-700">状態</th>
                  <th className="text-left py-2 px-2 font-bold text-violet-700">操作</th>
                </tr>
              </thead>
              <tbody>
                {(recentOrders ?? []).map((o) => (
                  <tr key={o.id} className="border-b border-violet-50 hover:bg-violet-50">
                    <td className="py-2 px-2 text-gray-500">{new Date(o.created_at).toLocaleDateString("ja-JP")}</td>
                    <td className="py-2 px-2 text-gray-600">{o.email}</td>
                    <td className="py-2 px-2 font-bold">{o.child_name}</td>
                    <td className="py-2 px-2 text-gray-600">{o.theme}</td>
                    <td className="py-2 px-2 text-gray-500 max-w-32 truncate">{o.address}</td>
                    <td className="py-2 px-2">¥{o.amount?.toLocaleString()}</td>
                    <td className="py-2 px-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        o.status === "shipped" ? "bg-green-100 text-green-700" :
                        o.status === "printing" ? "bg-blue-100 text-blue-700" :
                        o.status === "paid" ? "bg-amber-100 text-amber-700" :
                        "bg-gray-100 text-gray-500"
                      }`}>
                        {o.status === "shipped" ? "発送済み" :
                         o.status === "printing" ? "製本中" :
                         o.status === "paid" ? "注文済み" :
                         o.status === "preview" ? "未注文" : o.status}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      {o.status === "paid" && (
                        <form action="/api/admin/update-status" method="POST" className="inline">
                          <input type="hidden" name="orderId" value={o.id} />
                          <input type="hidden" name="status" value="printing" />
                          <input type="hidden" name="secret" value={process.env.CRON_SECRET} />
                          <button type="submit" className="text-blue-600 hover:underline text-xs">製本中に</button>
                        </form>
                      )}
                      {o.status === "printing" && (
                        <form action="/api/admin/update-status" method="POST" className="inline">
                          <input type="hidden" name="orderId" value={o.id} />
                          <input type="hidden" name="status" value="shipped" />
                          <input type="hidden" name="secret" value={process.env.CRON_SECRET} />
                          <button type="submit" className="text-green-600 hover:underline text-xs">発送済みに</button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
