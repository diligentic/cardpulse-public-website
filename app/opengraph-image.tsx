import { ImageResponse } from 'next/og';
export const alt = 'CardPulse — A business card is just the beginning.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() { return new ImageResponse(<div style={{ background: '#f7f6ff', color: '#172033', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 80, fontFamily: 'sans-serif' }}><div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#5146e5', marginBottom: 75 }}>CardPulse.</div><div style={{ display: 'flex', fontSize: 72, fontWeight: 700, letterSpacing: -4, lineHeight: 1.12 }}>A business card is</div><div style={{ display: 'flex', fontSize: 72, fontWeight: 700, letterSpacing: -4, color: '#5146e5' }}>just the beginning.</div><div style={{ display: 'flex', fontSize: 25, color: '#718096', marginTop: 35 }}>Scan. Review. Add context. Follow up.</div></div>, size); }
