import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

function getClaude() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}
function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export interface StoryInput {
  childName: string;
  childAge: number;
  childGender: string;
  likes: string[];
  theme: string;
  extra?: string;
}

export interface StoryPage {
  page: number;
  text: string;
  image_prompt?: string;
  image_url?: string;
}

export interface StoryResult {
  title: string;
  pages: StoryPage[];
  coverUrl: string;
}

async function generateImage(openai: OpenAI, prompt: string): Promise<string> {
  const res = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Children's picture book illustration. ${prompt} Watercolor style, soft pastel colors, cute and friendly, suitable for young children. No text, no letters.`,
    n: 1,
    size: "1024x1024",
    quality: "standard",
  });
  return res.data?.[0]?.url ?? "";
}

export async function generateStory(input: StoryInput): Promise<StoryResult> {
  const genderNote = input.childGender === "boy" ? "男の子" : input.childGender === "girl" ? "女の子" : "子供";
  const ageNote = input.childAge <= 3 ? "とても短く簡単な文章（1文ずつ）" : input.childAge <= 6 ? "短めで読みやすい文章（2〜3文）" : "少し長めの文章（3〜4文）";

  const charDesc = `${input.childAge}-year-old ${input.childGender === "boy" ? "boy" : input.childGender === "girl" ? "girl" : "child"} named ${input.childName}`;

  const prompt = `あなたは子供向け絵本作家です。
以下の情報をもとに、${input.childName}が主人公の絵本を作成してください。

【子供の情報】
- 名前: ${input.childName}
- 年齢: ${input.childAge}歳の${genderNote}
- 好きなもの: ${input.likes.join("、")}
- ストーリーテーマ: ${input.theme}
${input.extra ? `- 特別なリクエスト: ${input.extra}` : ""}

【絵本の要件】
- 12ページ構成
- 1ページの文章量: ${ageNote}
- 子供の名前（${input.childName}）を自然に登場させる
- 好きなもの（${input.likes.join("、")}）を物語に組み込む
- 温かく希望のある結末

【出力形式（JSON）】
{
  "title": "絵本のタイトル",
  "coverPrompt": "表紙イラストの英語プロンプト（40語以内・キャラ外見含む）",
  "pages": [
    {
      "page": 1,
      "text": "ページ1の文章",
      "image_prompt": "ページ1のイラスト英語プロンプト（30語以内・シーン描写）"
    },
    ...（12ページ分）
  ]
}

JSONのみ出力してください。`;

  const claude = getClaude();
  const openai = getOpenAI();

  const msg = await claude.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = (msg.content[0] as { type: string; text: string }).text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Story generation failed: invalid JSON");

  const story = JSON.parse(jsonMatch[0]) as {
    title: string;
    coverPrompt: string;
    pages: StoryPage[];
  };

  // 表紙 + 12ページ = 13枚 を並列生成
  const coverPromptFull = `${story.coverPrompt}, ${charDesc}, book cover composition`;
  const allPrompts = [
    coverPromptFull,
    ...story.pages.map((p) =>
      `${p.image_prompt ?? story.coverPrompt}, ${charDesc}, children's book scene`
    ),
  ];

  const imageUrls = await Promise.all(
    allPrompts.map((p) => generateImage(openai, p))
  );

  const coverUrl = imageUrls[0];
  const pagesWithImages: StoryPage[] = story.pages.map((p, i) => ({
    ...p,
    image_url: imageUrls[i + 1],
  }));

  return {
    title: story.title,
    pages: pagesWithImages,
    coverUrl,
  };
}
