import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
export const alt = 'Dovvy — A business card is just the beginning.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image() { const logo = await readFile(join(process.cwd(), 'public/branding/dovvy-logo.png')); const src = `data:image/png;base64,${logo.toString('base64')}`; return new ImageResponse(<div style={{ background: '#F6F5F2', color: '#1B2430', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 80, fontFamily: 'sans-serif' }}><img src={src} alt="Dovvy" width={210} height={70} style={{ marginBottom: 35 }} /><div style={{ display: 'flex', fontSize: 72, fontWeight: 700, letterSpacing: -4, lineHeight: 1.12 }}>A business card is</div><div style={{ display: 'flex', fontSize: 72, fontWeight: 700, letterSpacing: -4, color: '#0E5E6F' }}>just the beginning.</div><div style={{ display: 'flex', fontSize: 25, color: '#5F6670', marginTop: 35 }}>Scan. Review. Add context. Follow up.</div></div>, size); }
