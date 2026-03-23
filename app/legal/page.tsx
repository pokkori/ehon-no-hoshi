import Link from "next/link";

export default function LegalPage() {
  return (
    <main className="min-h-screen" style={{ background: "#fdf8ff" }}>
      <header className="border-b border-violet-100 bg-white">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="text-lg font-bold text-violet-900">📖 えほんのほし</Link>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-black text-violet-950 mb-8">特定商取引法に基づく表記</h1>
        <table className="w-full text-sm border-collapse">
          <tbody>
            {[
              ["販売事業者", "ポッコリラボ"],
              ["代表者名", "新美"],
              ["所在地", "〒475-0077 愛知県半田市元山町（住所は請求に応じて開示します）"],
              ["連絡先", "X(Twitter) @levona_design へのDM"],
              ["販売URL", "https://ehon-no-hoshi.vercel.app"],
              ["商品の名称", "えほんのほし — AIオリジナル絵本"],
              ["販売価格", "¥3,480/冊（税込・送料込み）"],
              ["支払方法", "クレジットカード（オンライン決済サービス）"],
              ["支払時期", "注文時に一括決済"],
              ["商品の引渡時期", "ご注文から7〜10営業日を目安にお届け"],
              ["返品・キャンセル", "オーダーメイド品のため、原則返品・キャンセル不可。プレビューでご確認の上ご注文ください。"],
            ].map(([label, value]) => (
              <tr key={label} className="border-b border-violet-100">
                <td className="py-3 pr-4 font-bold text-violet-900 whitespace-nowrap align-top w-1/3">{label}</td>
                <td className="py-3 text-gray-700 align-top">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="bg-violet-950 text-violet-200 py-8 text-center text-xs mt-16">
        <div className="flex justify-center gap-4 mb-3">
          <Link href="/legal" className="hover:text-white">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link>
        </div>
        <p>運営: ポッコリラボ（代表 新美）</p>
      </footer>
    </main>
  );
}
