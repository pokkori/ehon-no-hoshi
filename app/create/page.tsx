"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const THEMES = [
  { key: "恐竜の冒険", icon: "" },
  { key: "宇宙への旅", icon: "" },
  { key: "海の探検", icon: "" },
  { key: "魔法の森", icon: "" },
  { key: "動物の王国", icon: "" },
  { key: "お菓子の国", icon: "" },
  { key: "ひみつのたからさがし", icon: "️" },
  { key: "くものうえの楽園", icon: "️" },
  { key: "ロボットとなかよし", icon: "" },
  { key: "おまかせ（AIに任せる）", icon: "" },
];

const LIKES_SUGGESTIONS = [
  "恐竜", "電車", "飛行機", "車", "サッカー", "野球",
  "プリンセス", "ねこ", "いぬ", "うさぎ", "アンパンマン",
  "ポケモン", "プリキュア", "絵を描くこと", "ダンス", "水泳",
  "お菓子作り", "ピアノ", "読書", "積み木", "ブロック",
];

type Step = 1 | 2 | 3 | 4;

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customLike, setCustomLike] = useState("");

  const [form, setForm] = useState({
    childName: "",
    childAge: 4,
    childGender: "other" as "boy" | "girl" | "other",
    likes: [] as string[],
    theme: "",
    extra: "",
    email: "",
    postal_code: "",
    address: "",
    address_name: "",
  });

  const toggleLike = (item: string) => {
    setForm((prev) => {
      const has = prev.likes.includes(item);
      if (has) return { ...prev, likes: prev.likes.filter((l) => l !== item) };
      if (prev.likes.length >= 5) return prev;
      return { ...prev, likes: [...prev.likes, item] };
    });
  };

  const addCustomLike = () => {
    if (!customLike.trim() || form.likes.length >= 5) return;
    setForm((prev) => ({ ...prev, likes: [...prev.likes, customLike.trim()] }));
    setCustomLike("");
  };

  const canNext = () => {
    if (step === 1) return form.childName.trim().length > 0;
    if (step === 2) return form.likes.length > 0 && form.theme.length > 0;
    if (step === 3) return (
      form.email.includes("@") &&
      form.postal_code.trim().length >= 7 &&
      form.address.trim().length > 0 &&
      form.address_name.trim().length > 0
    );
    return true;
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.orderId) {
        setError(data.error ?? "生成に失敗しました。もう一度お試しください。");
        return;
      }
      router.push(`/preview/${data.orderId}`);
    } catch {
      setError("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12" style={{ background: "#fdf8ff" }}>
      <div className="mb-8 text-center">
        <span className="text-2xl font-black text-violet-900"> えほんのほし</span>
        <p className="text-sm text-gray-500 mt-1">絵本作成フォーム</p>
      </div>

      {/* プログレス */}
      <div className="flex gap-2 mb-10">
        {["1", "2", "3"].map((s, i) => (
          <div
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              Number(step) > i + 1 ? "bg-violet-500 text-white" :
              Number(step) === i + 1 ? "bg-violet-500 text-white ring-4 ring-violet-200" :
              "bg-violet-100 text-violet-400"
            }`}
          >
            {Number(step) > i + 1 ? "" : s}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md backdrop-blur-md bg-white/90 border border-violet-100 shadow-sm rounded-2xl p-8">
        {/* Step 1: 子供の基本情報 */}
        {step === 1 && (
          <div>
            <p className="text-xs text-violet-500 font-bold mb-1 tracking-wider">STEP 1 / 3</p>
            <h2 className="text-xl font-black text-violet-950 mb-6">主人公の子供を教えてください</h2>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-violet-700 mb-2 block">お子さんの名前（呼び名）*</label>
                <input
                  type="text"
                  placeholder="例: ゆうきくん、さくらちゃん"
                  value={form.childName}
                  onChange={(e) => setForm({ ...form, childName: e.target.value })}
                  className="w-full border-2 border-violet-200 focus:border-violet-400 rounded-xl px-4 py-3 text-base outline-none transition-colors"
                  maxLength={20}
                  aria-label="お子さんの名前（呼び名）を入力"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-violet-700 mb-2 block">年齢</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range" min={1} max={12} step={1}
                    value={form.childAge}
                    onChange={(e) => setForm({ ...form, childAge: Number(e.target.value) })}
                    className="flex-1"
                    aria-label={`お子さんの年齢を選択（現在: ${form.childAge}歳）`}
                  />
                  <span className="text-xl font-black text-violet-700 w-12 text-center">{form.childAge}歳</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-violet-700 mb-2 block">性別</label>
                <div className="flex gap-3">
                  {[
                    { key: "boy", label: "男の子 " },
                    { key: "girl", label: "女の子 " },
                    { key: "other", label: "どちらでも" },
                  ].map((g) => (
                    <button
                      key={g.key}
                      onClick={() => setForm({ ...form, childGender: g.key as typeof form.childGender })}
                      aria-label={`性別を${g.label}に設定する`}
                      aria-pressed={form.childGender === g.key}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-colors ${
                        form.childGender === g.key
                          ? "bg-violet-500 border-violet-500 text-white"
                          : "bg-white border-violet-200 text-violet-700 hover:border-violet-400"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: 好き・テーマ */}
        {step === 2 && (
          <div>
            <p className="text-xs text-violet-500 font-bold mb-1 tracking-wider">STEP 2 / 3</p>
            <h2 className="text-xl font-black text-violet-950 mb-2">好きなもの＆ストーリー</h2>
            <p className="text-sm text-gray-500 mb-5">物語に登場させたい好きなもの（最大5つ）</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {LIKES_SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleLike(item)}
                  aria-label={`${item}を${form.likes.includes(item) ? "選択解除" : "選択"}する`}
                  aria-pressed={form.likes.includes(item)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-colors ${
                    form.likes.includes(item)
                      ? "bg-violet-500 border-violet-500 text-white"
                      : "bg-white border-violet-200 text-violet-700 hover:border-violet-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="その他の好き（自由入力）"
                value={customLike}
                onChange={(e) => setCustomLike(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomLike()}
                className="flex-1 border-2 border-violet-200 focus:border-violet-400 rounded-xl px-3 py-2 text-sm outline-none"
                maxLength={20}
              />
              <button
                onClick={addCustomLike}
                disabled={!customLike.trim() || form.likes.length >= 5}
                className="bg-violet-500 text-white px-3 py-2 rounded-xl text-sm font-bold disabled:opacity-40 min-h-[44px]"
                aria-label="入力した好きなものをリストに追加する"
              >
                追加
              </button>
            </div>

            {form.likes.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-6">
                {form.likes.map((l) => (
                  <span key={l} className="bg-violet-100 text-violet-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    {l}
                    <button onClick={() => setForm((prev) => ({ ...prev, likes: prev.likes.filter((x) => x !== l) }))} aria-label={`${l}を削除する`} className="text-violet-400 hover:text-violet-600 ml-1">×</button>
                  </span>
                ))}
              </div>
            )}

            <p className="text-xs font-bold text-violet-700 mb-3">ストーリーのテーマ *</p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {THEMES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setForm({ ...form, theme: t.key })}
                  aria-label={`テーマを${t.key}に設定する`}
                  aria-pressed={form.theme === t.key}
                  className={`border-2 rounded-xl px-3 py-3 text-left transition-colors ${
                    form.theme === t.key
                      ? "border-violet-500 bg-violet-50"
                      : "border-violet-100 hover:border-violet-300"
                  }`}
                >
                  <span className="text-xl block mb-1">{t.icon}</span>
                  <span className="text-xs font-bold text-violet-900">{t.key}</span>
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-violet-700 mb-2 block">特別なリクエスト（任意）</label>
              <textarea
                placeholder="例: おじいちゃんへのプレゼントなので、家族の絆についても触れてほしい"
                value={form.extra}
                onChange={(e) => setForm({ ...form, extra: e.target.value })}
                rows={3}
                className="w-full border-2 border-violet-200 focus:border-violet-400 rounded-xl px-4 py-3 text-sm outline-none resize-none"
                maxLength={200}
              />
            </div>
          </div>
        )}

        {/* Step 3: 届け先 */}
        {step === 3 && (
          <div>
            <p className="text-xs text-violet-500 font-bold mb-1 tracking-wider">STEP 3 / 3</p>
            <h2 className="text-xl font-black text-violet-950 mb-6">お届け先を教えてください</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-violet-700 mb-1 block">メールアドレス *</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-2 border-violet-200 focus:border-violet-400 rounded-xl px-4 py-3 text-base outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-violet-700 mb-1 block">郵便番号 *</label>
                <input
                  type="text"
                  placeholder="1234567（ハイフンなし）"
                  value={form.postal_code}
                  onChange={(e) => setForm({ ...form, postal_code: e.target.value.replace(/-/g, "") })}
                  className="w-full border-2 border-violet-200 focus:border-violet-400 rounded-xl px-4 py-3 text-base outline-none"
                  maxLength={8}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-violet-700 mb-1 block">住所 *</label>
                <input
                  type="text"
                  placeholder="都道府県から番地・部屋番号まで"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full border-2 border-violet-200 focus:border-violet-400 rounded-xl px-4 py-3 text-base outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-violet-700 mb-1 block">宛名（封筒に印刷） *</label>
                <input
                  type="text"
                  placeholder="例: 田中 ゆうき 様"
                  value={form.address_name}
                  onChange={(e) => setForm({ ...form, address_name: e.target.value })}
                  className="w-full border-2 border-violet-200 focus:border-violet-400 rounded-xl px-4 py-3 text-base outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <button
          onClick={() => {
            if (step < 3) {
              setStep((prev) => (prev + 1) as Step);
            } else {
              handleGenerate();
            }
          }}
          disabled={!canNext() || loading}
          className="w-full mt-8 bg-violet-500 hover:bg-violet-600 text-white font-black py-4 rounded-2xl shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0 min-h-[44px]"
          aria-label={step === 1 ? "ページを追加する" : step === 2 ? "エピソードを次に進む" : "絵本を注文する"}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              AIが絵本を生成中...（1〜2分かかります）
            </span>
          ) : step < 3 ? "次へ →" : "絵本のプレビューを作る "}
        </button>

        {step === 3 && !loading && (
          <p className="text-xs text-gray-400 mt-3 text-center">プレビュー確認後に決済します。今すぐ料金はかかりません。</p>
        )}
      </div>
    </main>
  );
}
