import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import PreviewClient from "./PreviewClient";

export const dynamic = "force-dynamic";

interface StoryPage {
  page: number;
  text: string;
}

export default async function PreviewPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const supabase = getSupabaseAdmin();
  const { data: order } = await supabase
    .from("orders")
    .select("id, title, story, cover_url, child_name, status, amount")
    .eq("id", orderId)
    .single();

  if (!order) notFound();

  // 支払い済みならsuccess画面に
  if (order.status === "paid" || order.status === "printing" || order.status === "shipped") {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "#fdf8ff" }}>
        <div className="text-center p-8">
          <div className="text-5xl mb-4">📖</div>
          <p className="text-xl font-black text-violet-950 mb-2">この絵本はご注文済みです</p>
          <p className="text-gray-500">ご注文ありがとうございました</p>
        </div>
      </main>
    );
  }

  return (
    <PreviewClient
      orderId={order.id}
      title={order.title}
      pages={order.story as StoryPage[]}
      coverUrl={order.cover_url}
      childName={order.child_name}
    />
  );
}
