import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'えほんのほし｜AIが作る、世界にひとつだけの絵本';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0d0d2b 0%, #1a1a4e 50%, #2d1b69 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ width: 64, height: 64, background: '#fbbf24', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#0d0d2b">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
          <span style={{ color: '#fbbf24', fontSize: 28, fontWeight: 700 }}>えほんのほし</span>
        </div>
        <div style={{ color: 'white', fontSize: 44, fontWeight: 900, textAlign: 'center', lineHeight: 1.3, maxWidth: 900 }}>
          AIが作る、
          <br />
          世界にひとつだけの絵本
        </div>
        <div style={{ color: '#c4b5fd', fontSize: 22, marginTop: 24, textAlign: 'center' }}>
          お子さんの名前・好き・テーマで完全オリジナル | 誕生日・入園プレゼントに
        </div>
      </div>
    ),
    { ...size }
  );
}
