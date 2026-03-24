import Link from "next/link";
import StreakBadge from "@/components/StreakBadge";

const SAMPLE_PAGES = [
  { page: 1, text: "むかしむかし、ゆうきという男の子がいました。\nゆうきは恐竜が大すきで、毎日図かんを読んでいました。" },
  { page: 2, text: "ある夜、ゆうきが寝ていると、枕もとに光るたまごが現れました。\n「ぼくは恐竜のたまごかな？」" },
  { page: 3, text: "たまごからうまれたのは、小さな緑色のトリケラトプス！\n「ぼくのなまえはピコだよ」とピコは言いました。" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: "#fdf8ff" }}>
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 border-b border-violet-100 bg-white/90 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-lg font-bold text-violet-900"> えほんのほし</span>
          <div className="flex items-center gap-3">
            <StreakBadge />
            <Link
              href="/create"
              className="bg-violet-500 hover:bg-violet-600 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors min-h-[44px] inline-flex items-center"
              aria-label="オリジナル絵本作成フォームへ進む"
            >
              絵本を作る
            </Link>
          </div>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="max-w-2xl mx-auto px-4 pt-16 pb-12 text-center">
        <p className="text-violet-500 text-sm font-bold mb-3 tracking-wider">AI PICTURE BOOK</p>
        <h1 className="text-3xl md:text-4xl font-black text-violet-950 leading-tight mb-4">
          その子だけの絵本が、<br />
          この世界にひとつ生まれる。
        </h1>
        <p className="text-gray-600 text-base mb-8 leading-relaxed">
          名前・好き・テーマを入力するだけ。<br />
          AIが12ページのオリジナルストーリーを書き、<br />
          表紙イラストつきの絵本をご自宅に郵送します。
        </p>
        <Link
          href="/create"
          className="inline-block bg-violet-500 hover:bg-violet-600 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 min-h-[44px]"
          aria-label="無料で絵本プレビューを作成する"
        >
          無料プレビューを作る →
        </Link>
        <p className="text-xs text-gray-400 mt-3">プレビュー無料 · 気に入ったら注文 · ¥4,980/冊</p>
      </section>

      {/* サンプル絵本 */}
      <section className="max-w-xl mx-auto px-4 mb-16">
        <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px' }} className="shadow-md p-6 relative">
          <div className="absolute -top-3 left-6 bg-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            サンプル（ゆうきくんの恐竜の冒険）
          </div>
          <div className="space-y-5 mt-2">
            {SAMPLE_PAGES.map((p) => (
              <div key={p.page} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-black shrink-0">
                  {p.page}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{p.text}</p>
              </div>
            ))}
            <p className="text-center text-gray-400 text-sm">…全12ページ続く</p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-3">※実際はお子さんの名前・好きが物語に登場します</p>
      </section>

      {/* シーン */}
      <section className="bg-violet-50 py-12 mb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-xl font-black text-violet-950 mb-6">こんな時に</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "", text: "誕生日\nプレゼント" },
              { icon: "", text: "入園・入学\nのお祝い" },
              { icon: "", text: "卒園・卒業\nの記念に" },
              { icon: "", text: "クリスマス\nプレゼント" },
            ].map((item) => (
              <div key={item.text} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} className="p-4 shadow-sm">
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm text-gray-700 font-medium whitespace-pre-line">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3ステップ */}
      <section className="max-w-2xl mx-auto px-4 mb-16">
        <h2 className="text-xl font-black text-violet-950 text-center mb-8">3ステップで完成</h2>
        <div className="space-y-4">
          {[
            { step: "1", title: "子供の情報を入力", desc: "名前・年齢・好きなもの・ストーリーのテーマを選ぶだけ。2分で完了。" },
            { step: "2", title: "AIが絵本を生成", desc: "AIが12ページのオリジナルストーリーと表紙イラストを自動生成。プレビューで内容を確認できます。" },
            { step: "3", title: "気に入ったら注文", desc: "¥3,480を支払うと、ご自宅に絵本が届きます。7〜10営業日でお届け。" },
          ].map((item) => (
            <div key={item.step} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} className="flex items-start gap-4 p-5 shadow-sm">
              <div className="w-10 h-10 bg-violet-500 text-white rounded-full flex items-center justify-center font-black text-lg shrink-0">
                {item.step}
              </div>
              <div>
                <p className="font-bold text-violet-950 mb-1">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 料金 */}
      <section className="max-w-md mx-auto px-4 mb-16">
        <h2 className="text-xl font-black text-violet-950 text-center mb-6">料金</h2>
        <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '2px solid rgba(139,92,246,0.4)', borderRadius: '16px' }} className="shadow-sm p-8 text-center">
          <p className="text-sm font-bold text-violet-500 mb-2">オリジナル絵本 1冊</p>
          <p className="text-5xl font-black text-violet-950 mb-1">¥4,980</p>
          <p className="text-sm text-gray-400 mb-6">税込・送料込み</p>
          <ul className="space-y-2 text-sm text-gray-700 text-left mb-8">
            <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0"></span>12ページオリジナルストーリー</li>
            <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0"></span>全12ページにAI生成イラスト</li>
            <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0"></span>A5サイズ・製本絵本</li>
            <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0"></span>ご自宅へ郵送</li>
            <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0"></span>プレビュー確認後に注文</li>
          </ul>
          <Link
            href="/create"
            className="w-full inline-block bg-violet-500 hover:bg-violet-600 text-white font-black text-base py-4 rounded-2xl transition-colors min-h-[44px]"
            aria-label="無料プレビューで絵本を作り始める"
          >
            まず無料プレビューを作る →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 mb-16">
        <h2 className="text-xl font-black text-violet-950 text-center mb-8">よくある質問</h2>
        <div className="space-y-3">
          {[
            { q: "何歳のお子さん向けですか？", a: "0歳〜10歳くらいのお子さん向けに最適化されています。年齢を入力いただくことで、文章の難易度や内容を調整します。" },
            { q: "どんなテーマを選べますか？", a: "恐竜・宇宙・海・魔法の森・動物の王国・お菓子の国など10種類以上から選べます。自由入力でオリジナルテーマも指定できます。" },
            { q: "プレビューと実際の絵本はどう違いますか？", a: "プレビューはWebで文章と表紙イラストを確認できます。注文後に製本した物理的な絵本をお届けします。" },
            { q: "いつ届きますか？", a: "ご注文から7〜10営業日を目安にお届けします。発送時にメールでお知らせします。" },
            { q: "返品・キャンセルはできますか？", a: "オーダーメイド品のため、原則として返品・キャンセルはお受けできません。プレビューで内容をご確認の上ご注文ください。" },
          ].map((item) => (
            <details key={item.q} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} className="p-5 group cursor-pointer">
              <summary className="font-bold text-sm text-violet-950 list-none flex justify-between items-center">
                {item.q}
                <span className="text-violet-400 group-open:rotate-180 transition-transform"></span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 最終CTA */}
      <section className="bg-violet-500 py-16 text-center">
        <h2 className="text-2xl font-black text-white mb-3">プレビューは無料です。</h2>
        <p className="text-violet-100 text-sm mb-8">まず作ってみて、気に入ったら注文してください。</p>
        <Link
          href="/create"
          className="inline-block bg-white hover:bg-violet-50 text-violet-600 font-black text-lg px-10 py-4 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5 min-h-[44px]"
          aria-label="絵本作成フォームへ移動して絵本を作りはじめる"
        >
          絵本を作りはじめる →
        </Link>
      </section>

      {/* フッター */}
      <footer className="bg-violet-950 text-violet-200 py-8 text-center text-xs">
        <div className="flex justify-center gap-4 mb-3">
          <Link href="/legal" className="hover:text-white" aria-label="特定商取引法に基づく表記を確認する">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-white" aria-label="プライバシーポリシーを確認する">プライバシーポリシー</Link>
        </div>
        <p>運営: ポッコリラボ（代表 新美）</p>
      </footer>
    </main>
  );
}
