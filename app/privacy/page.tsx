import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen" style={{ background: "#fdf8ff" }}>
      <header className="border-b border-violet-100 bg-white">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-lg font-bold text-violet-900"> えほんのほし</Link>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-8 text-sm text-gray-700 leading-relaxed">
        <h1 className="text-2xl font-black text-violet-950">プライバシーポリシー</h1>
        {[
          { title: "1. 収集する情報", body: "当サービスは以下の情報を収集します：お子さんの名前（呼び名）・年齢・性別、好きなもの、ストーリーテーマ、メールアドレス、住所（郵便番号・都道府県以下）、クレジットカード情報（PAY.JPが処理。当サービスには保存されません）。" },
          { title: "2. 利用目的", body: "収集した個人情報は、絵本の生成・印刷・郵送、発送通知メールの送信にのみ使用します。第三者への提供は行いません（法令に基づく場合を除く）。" },
          { title: "3. 情報の保管", body: "個人情報はSupabase（米国）のセキュアなデータベースに保存されます。お子さんの情報を含む注文データは発送完了後も1年間保管し、その後削除します。" },
          { title: "4. お問い合わせ", body: "X(Twitter) @levona_design へのDMにてお問い合わせください。" },
        ].map((s) => (
          <div key={s.title}>
            <h2 className="font-bold text-violet-950 mb-2">{s.title}</h2>
            <p>{s.body}</p>
          </div>
        ))}
        <p className="text-xs text-gray-400">制定日: 2026年3月 / ポッコリラボ</p>
      </div>
      <footer className="bg-violet-950 text-violet-200 py-8 text-center text-xs mt-8">
        <div className="flex justify-center gap-4 mb-3">
          <Link href="/legal" className="hover:text-white">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
        </div>
        <p>運営: ポッコリラボ（代表 新美）</p>
      </footer>
    </main>
  );
}
