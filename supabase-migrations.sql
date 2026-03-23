-- えほんのほし Supabase マイグレーション

-- 注文テーブル
CREATE TABLE IF NOT EXISTS orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL,
  child_name      TEXT NOT NULL,
  child_age       INT,
  child_gender    TEXT,             -- 'boy' | 'girl' | 'other'
  likes           TEXT[],           -- 好きなもの（最大5つ）
  theme           TEXT NOT NULL,    -- ストーリーテーマ
  extra           TEXT,             -- 追加メモ（任意）
  -- 生成コンテンツ
  story           JSONB,            -- [{page: 1, text: "...", image_prompt: "..."}, ...]
  cover_url       TEXT,             -- DALL-E 3 表紙URL
  title           TEXT,             -- AI生成タイトル
  -- 配送先
  postal_code     TEXT NOT NULL,
  address         TEXT NOT NULL,
  address_name    TEXT NOT NULL,    -- 宛名
  -- 決済
  payjp_charge_id TEXT,
  amount          INT DEFAULT 3480, -- 注文金額
  -- ステータス
  status          TEXT DEFAULT 'preview', -- 'preview' | 'paid' | 'printing' | 'shipped'
  shipped_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- RLS有効化
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Service Roleのみアクセス可
-- anon キーからのアクセスは完全ブロック

-- インデックス
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
