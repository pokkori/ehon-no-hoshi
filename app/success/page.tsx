import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center" style={{ background: "#fdf8ff" }}>
      <div className="max-w-md w-full">
        <div className="text-6xl mb-6">📖</div>
        <h1 className="text-2xl font-black text-violet-950 mb-4">
          ご注文ありがとうございます！
        </h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          世界にひとつだけの絵本を製作中です。<br />
          7〜10営業日を目安にお届けします。<br />
          発送時にメールでお知らせします。
        </p>

        <div className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6 mb-8 text-left space-y-3">
          {[
            { num: "1", text: "AIが書いたストーリーをもとに印刷・製本" },
            { num: "2", text: "品質確認後、ご登録住所へ発送" },
            { num: "3", text: "発送時にメールでお知らせ" },
          ].map((item) => (
            <div key={item.num} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                {item.num}
              </div>
              <p className="text-sm text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>

        <Link
          href="/create"
          className="w-full inline-block bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 rounded-xl transition-colors mb-3"
        >
          別の絵本も作る
        </Link>
        <Link
          href="/"
          className="w-full inline-block bg-white hover:bg-violet-50 text-violet-700 font-bold py-3 rounded-xl border border-violet-200 transition-colors"
        >
          トップページに戻る
        </Link>
      </div>
    </main>
  );
}
