import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { generateStory } from "@/lib/story";

export const dynamic = "force-dynamic";
export const maxDuration = 120; // DALL-E 3 含む生成に時間がかかる

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    childName, childAge, childGender, likes, theme, extra,
    email, postal_code, address, address_name,
  } = body;

  if (!childName || !email || !postal_code || !address || !address_name || !theme) {
    return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
  }

  try {
    const result = await generateStory({
      childName,
      childAge: Number(childAge) || 4,
      childGender: childGender || "other",
      likes: Array.isArray(likes) ? likes : [],
      theme,
      extra,
    });

    const supabase = getSupabaseAdmin();
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        email,
        child_name: childName,
        child_age: childAge,
        child_gender: childGender,
        likes: likes ?? [],
        theme,
        extra: extra || null,
        story: result.pages,
        cover_url: result.coverUrl,
        title: result.title,
        postal_code,
        address,
        address_name,
        status: "preview",
      })
      .select("id")
      .single();

    if (error || !order) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
    }

    return NextResponse.json({ orderId: order.id });
  } catch (e) {
    console.error("Story generation error:", e);
    return NextResponse.json({ error: "絵本の生成に失敗しました。もう一度お試しください。" }, { status: 500 });
  }
}
