import { NextResponse } from 'next/server';
const requests = new Map<string, { count: number; until: number }>();
export async function POST(request: Request) {
 const origin = request.headers.get('origin');
 const requestURL = new URL(request.url);
 const expectedOrigin = `${requestURL.protocol}//${request.headers.get('host') || requestURL.host}`;
 if (origin && origin !== expectedOrigin) return NextResponse.json({ message: 'Please submit the form from this website.' }, { status: 403 });
 if (Number(request.headers.get('content-length') || 0) > 12000) return NextResponse.json({ message: 'Your message is too long.' }, { status: 413 });
 const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local'; const now = Date.now();
 for (const [key, value] of requests) if (value.until < now) requests.delete(key);
 const recent = requests.get(ip); if (recent && recent.count >= 5) return NextResponse.json({ message: 'Too many enquiries. Please try again in 15 minutes.' }, { status: 429, headers: { 'Retry-After': '900' } });
 let data; try { const raw = await request.text(); if (raw.length > 12000) throw new Error('size'); data = JSON.parse(raw); } catch { return NextResponse.json({ message: 'Please check the form and try again.' }, { status: 400 }); }
 if (!data || typeof data !== 'object') return NextResponse.json({ message: 'Invalid form.' }, { status: 400 });
 if (data.website) return NextResponse.json({ message: 'Unable to submit this enquiry.' }, { status: 400 });
 if (typeof data.name !== 'string' || !data.name.trim() || data.name.length > 100 || typeof data.email !== 'string' || data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !['Sales', 'Support', 'Billing', 'Privacy', 'Partnership', 'Other'].includes(data.topic) || typeof data.message !== 'string' || data.message.trim().length < 10 || data.message.length > 5000 || data.consent !== 'on') return NextResponse.json({ message: 'Please complete all fields with a valid email, a message of at least 10 characters, and the privacy acknowledgement.' }, { status: 400 });
 requests.set(ip, { count: (recent?.count || 0) + 1, until: recent?.until || now + 900000 });
 const webhook = process.env.CONTACT_WEBHOOK_URL;
 if (!webhook) return NextResponse.json({ message: 'Message not sent: contact delivery is not configured in this preview. Please try again when the public contact service is available.' }, { status: 503 });
 try { const destination = new URL(webhook); if (destination.protocol !== 'https:') throw new Error('HTTPS required'); const result = await fetch(destination, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify({ name: data.name.trim(), email: data.email.trim(), topic: data.topic, message: data.message.trim(), privacyAcknowledged: true }), signal: AbortSignal.timeout(10000) }); if (!result.ok) throw new Error('Delivery failed'); return NextResponse.json({ message: 'Your enquiry has been submitted. Thank you for getting in touch.' }); } catch { return NextResponse.json({ message: 'Your enquiry could not be delivered. Please try again later.' }, { status: 502 }); }
}
