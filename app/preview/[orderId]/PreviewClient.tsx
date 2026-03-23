"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

const PayjpModal = dynamic(() => import("@/components/PayjpModal"), { ssr: false });

interface StoryPage {
  page: number;
  text: string;
  image_url?: string;
}

interface Props {
  orderId: string;
  title: string;
  pages: StoryPage[];
  coverUrl: string;
  childName: string;
}

export default function PreviewClient({ orderId, title, pages, coverUrl, childName }: Props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // 0=表紙

  const totalPages = pages?.length ?? 0;

  const goPage = (n: number) => setCurrentPage(Math.max(0, Math.min(totalPages, n)));

  const currentImg = currentPage === 0
    ? coverUrl
    : pages[currentPage - 1]?.image_url;

  const currentText = currentPage === 0
    ? null
    : pages[currentPage - 1]?.text;

  return (
    <main className="min-h-screen" style={{ background: "#fdf8ff" }}>
      <header className="sticky top-0 z-40 border-b border-violet-100 bg-white/90 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-violet-900">📖 えほんのほし</Link>
          <button
            onClick={() => setShowModal(true)}
            className="bg-violet-500 hover:bg-violet-600 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors"
          >
            注文する ¥4,980
          </button>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-4">
          <p className="text-xs text-violet-500 font-bold tracking-wider mb-2">プレビュー</p>
          <h1 className="text-xl font-black text-violet-950">「{title}」</h1>
          <p className="text-sm text-gray-500 mt-1">{childName}の絵本</p>
        </div>

        {/* 絵本ページ */}
        <div className="bg-white rounded-2xl shadow-lg border border-violet-100 overflow-hidden mb-4">
          {/* イラスト */}
          <div className="relative w-full aspect-square bg-violet-50">
            {currentImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentImg}
                alt={currentPage === 0 ? "表紙" : `P.${currentPage}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-3">📖</div>
                  <p className="text-sm text-violet-400">イラストを読み込み中...</p>
                </div>
              </div>
            )}
            {/* ページ番号バッジ */}
            <div className="absolute top-3 left-3 bg-black/40 text-white text-xs font-bold px-2 py-1 rounded-full">
              {currentPage === 0 ? "表紙" : `P.${currentPage} / ${totalPages}`}
            </div>
          </div>

          {/* テキスト */}
          {currentPage === 0 ? (
            <div className="p-6 text-center">
              <p className="font-black text-xl text-violet-950">{title}</p>
              <p className="text-sm text-gray-500 mt-1">{childName}の物語</p>
            </div>
          ) : (
            <div className="p-6">
              <p className="text-gray-800 text-base leading-loose whitespace-pre-line text-center">
                {currentText}
              </p>
            </div>
          )}
        </div>

        {/* ナビゲーション */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => goPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-5 py-2.5 rounded-xl border-2 border-violet-200 text-violet-700 font-bold text-sm disabled:opacity-30 hover:border-violet-400 transition-colors"
          >
            ← 前
          </button>
          <div className="flex gap-1 flex-wrap justify-center max-w-xs">
            {[0, ...Array.from({ length: totalPages }, (_, i) => i + 1)].map((p) => (
              <button
                key={p}
                onClick={() => goPage(p)}
                className={`w-6 h-6 rounded-full text-xs font-bold transition-colors ${
                  currentPage === p
                    ? "bg-violet-500 text-white"
                    : "bg-violet-100 text-violet-500 hover:bg-violet-200"
                }`}
              >
                {p === 0 ? "表" : p}
              </button>
            ))}
          </div>
          <button
            onClick={() => goPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-2.5 rounded-xl border-2 border-violet-200 text-violet-700 font-bold text-sm disabled:opacity-30 hover:border-violet-400 transition-colors"
          >
            次 →
          </button>
        </div>

        {/* 注文CTA */}
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-center text-white">
          <p className="font-black text-xl mb-1">この絵本を注文する</p>
          <p className="text-violet-100 text-sm mb-1">全ページイラスト入り · A5製本 · 送料込み</p>
          <p className="text-violet-200 text-xs mb-5">7〜10営業日でお届け</p>
          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-white hover:bg-violet-50 text-violet-600 font-black text-lg py-4 rounded-2xl shadow-md transition-all hover:-translate-y-0.5"
          >
            ¥4,980 で注文する →
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-5">
          <Link href="/create" className="text-xs text-gray-400 hover:underline">
            別の絵本を作り直す
          </Link>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("AIで絵本を作りました！ #えほんのほし #AI絵本 https://ehon-no-hoshi.vercel.app")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-lg bg-black hover:bg-gray-800 text-white font-medium transition-colors"
            aria-label="えほんのほしを使ったことをXにシェアする"
          >
            Xにシェア
          </a>
        </div>
      </div>

      {showModal && (
        <PayjpModal
          publicKey={process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY!}
          orderId={orderId}
          onSuccess={() => router.push("/success")}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}
