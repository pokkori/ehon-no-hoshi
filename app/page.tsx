import Link from "next/link";
import StreakBadge from "@/components/StreakBadge";

/* --- SVG Icons (replaces all emoji) --- */
function BookSvg({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <path d="M4 6c4-2 8-1 12 1 4-2 8-3 12-1v20c-4-2-8-1-12 1-4-2-8-3-12-1V6z" fill="#8B5CF6" />
      <path d="M16 7v20" stroke="#C4B5FD" strokeWidth="1.5" />
      <path d="M8 10h6M8 14h5M20 10h4M20 14h3" stroke="#DDD6FE" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
function CakeSvg() {
  return (
    <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden="true">
      <rect x="6" y="16" width="20" height="10" rx="3" fill="#EC4899" />
      <rect x="4" y="14" width="24" height="4" rx="2" fill="#F472B6" />
      <rect x="14" y="8" width="4" height="8" rx="1" fill="#FDE68A" />
      <circle cx="16" cy="7" r="2" fill="#F97316" />
    </svg>
  );
}
function BackpackSvg() {
  return (
    <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden="true">
      <rect x="8" y="10" width="16" height="18" rx="3" fill="#3B82F6" />
      <rect x="10" y="14" width="12" height="6" rx="2" fill="#93C5FD" />
      <path d="M12 10V8a4 4 0 018 0v2" stroke="#1D4ED8" strokeWidth="2" fill="none" />
    </svg>
  );
}
function GradCapSvg() {
  return (
    <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden="true">
      <polygon points="16,6 2,14 16,22 30,14" fill="#1D4ED8" />
      <path d="M8 16v8c4 3 12 3 16 0v-8" fill="none" stroke="#3B82F6" strokeWidth="2" />
      <line x1="28" y1="14" x2="28" y2="26" stroke="#F59E0B" strokeWidth="2" />
      <circle cx="28" cy="27" r="1.5" fill="#F59E0B" />
    </svg>
  );
}
function TreeSvg() {
  return (
    <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden="true">
      <rect x="14" y="22" width="4" height="8" fill="#92400E" />
      <polygon points="16,2 4,22 28,22" fill="#22C55E" />
      <circle cx="10" cy="16" r="2" fill="#EF4444" />
      <circle cx="20" cy="14" r="2" fill="#FBBF24" />
      <circle cx="16" cy="10" r="2" fill="#3B82F6" />
    </svg>
  );
}
function CheckVioletSvg() {
  return (
    <svg viewBox="0 0 20 20" width={16} height={16} aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="#8B5CF6" />
      <path d="M6 10l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronVioletSvg() {
  return (
    <svg viewBox="0 0 20 20" width={16} height={16} aria-hidden="true">
      <path d="M7 5l5 5-5 5" stroke="#8B5CF6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function StarSvg() {
  return (
    <svg viewBox="0 0 32 32" width={28} height={28} aria-hidden="true">
      <polygon points="16,2 20,12 31,12 22,19 25,30 16,23 7,30 10,19 1,12 12,12" fill="#FBBF24" />
    </svg>
  );
}

/* --- Floating particles --- */
function FloatingStars() {
  return (
    <>
      <style>{`
        @keyframes starTwinkle {
          0% { transform: scale(0.8) rotate(0deg); opacity: 0.2; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.5; }
          100% { transform: scale(0.8) rotate(360deg); opacity: 0.2; }
        }
      `}</style>
      {[12, 28, 50, 72, 85, 40].map((left, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left: `${left}%`, top: `${15 + i * 12}%`,
          width: 4 + i * 2, height: 4 + i * 2,
          animation: `starTwinkle ${3 + i}s ease-in-out ${i * 0.4}s infinite`,
        }}>
          <svg viewBox="0 0 12 12" width="100%" height="100%">
            <polygon points="6,0 7.5,4 12,4.5 8.5,7.5 9.5,12 6,9.5 2.5,12 3.5,7.5 0,4.5 4.5,4" fill="#C4B5FD" />
          </svg>
        </div>
      ))}
    </>
  );
}

const SAMPLE_PAGES = [
  { page: 1, text: "むかしむかし、ゆうきという男の子がいました。\nゆうきは恐竜が大すきで、毎日図かんを読んでいました。" },
  { page: 2, text: "ある夜、ゆうきが寝ていると、枕もとに光るたまごが現れました。\n「ぼくは恐竜のたまごかな？」" },
  { page: 3, text: "たまごからうまれたのは、小さな緑色のトリケラトプス！\n「ぼくのなまえはピコだよ」とピコは言いました。" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(ellipse at 20% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(168,85,247,0.04) 0%, transparent 50%), #fdf8ff',
    }}>
      <FloatingStars />
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 border-b border-violet-100" style={{
        background: 'rgba(253,248,255,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-lg font-bold flex items-center gap-1" style={{
            background: 'linear-gradient(135deg, #5B21B6, #8B5CF6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}><StarSvg /> えほんのほし</span>
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
      <section className="max-w-2xl mx-auto px-4 pt-16 pb-12 text-center relative z-10">
        <p className="text-sm font-bold mb-3" style={{
          color: '#8B5CF6',
          textShadow: '0 0 10px rgba(139,92,246,0.3)',
          letterSpacing: '0.2em',
        }}>AI PICTURE BOOK</p>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4" style={{
          background: 'linear-gradient(135deg, #5B21B6 0%, #8B5CF6 40%, #A855F7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 12px rgba(139,92,246,0.2))',
        }}>
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
          className="inline-block text-white font-black text-lg px-10 py-4 rounded-2xl min-h-[56px] transition-all duration-200 hover:-translate-y-1 active:scale-[0.95]"
          aria-label="無料で絵本プレビューを作成する"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
            boxShadow: '0 0 30px rgba(139,92,246,0.4), 0 6px 20px rgba(0,0,0,0.15)',
          }}
        >
          <span className="flex items-center gap-2"><BookSvg size={20} /> 無料プレビューを作る</span>
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
              { svgEl: <CakeSvg />, text: "誕生日\nプレゼント" },
              { svgEl: <BackpackSvg />, text: "入園・入学\nのお祝い" },
              { svgEl: <GradCapSvg />, text: "卒園・卒業\nの記念に" },
              { svgEl: <TreeSvg />, text: "クリスマス\nプレゼント" },
            ].map((item) => (
              <div key={item.text} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} className="p-4 shadow-sm">
                <div className="mb-2 flex justify-center" aria-hidden="true">{item.svgEl}</div>
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
            <li className="flex items-start gap-2"><span className="shrink-0"><CheckVioletSvg /></span>12ページオリジナルストーリー</li>
            <li className="flex items-start gap-2"><span className="shrink-0"><CheckVioletSvg /></span>全12ページにAI生成イラスト</li>
            <li className="flex items-start gap-2"><span className="shrink-0"><CheckVioletSvg /></span>A5サイズ・製本絵本</li>
            <li className="flex items-start gap-2"><span className="shrink-0"><CheckVioletSvg /></span>ご自宅へ郵送</li>
            <li className="flex items-start gap-2"><span className="shrink-0"><CheckVioletSvg /></span>プレビュー確認後に注文</li>
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
                <span className="group-open:rotate-180 transition-transform"><ChevronVioletSvg /></span>
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
