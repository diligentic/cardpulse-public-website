import assert from 'node:assert/strict';

const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:3000';
const routes = ['/', '/how-it-works', '/pricing', '/privacy-security', '/about', '/contact', '/privacy', '/terms', '/data-deletion'];
const titles = new Set();
for (const route of routes) {
  const response = await fetch(`${origin}${route}`);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title, `${route}: title`);
  assert.ok(!titles.has(title), `${route}: unique title`);
  titles.add(title);
  assert.ok(html.includes(`https://cardpulse.com${route === '/' ? '' : route}`), `${route}: canonical`);
  assert.ok(html.includes('id="main"'), `${route}: main landmark`);
  assert.ok(html.includes('https://card-scanner-pulse.netlify.app/'), `${route}: app install destination`);
  assert.ok(!html.includes('https://card-scanner-pulse.netlify.app/install'), `${route}: no nonexistent install route`);
  assert.ok(!html.includes('serviceWorker.register'), `${route}: no marketing service worker`);
  console.log(`PASS ${route}`);
}
for (const route of ['/robots.txt', '/sitemap.xml', '/opengraph-image', '/favicon.ico', '/branding/dovvy-logo.png', '/branding/favicon-32.png']) {
  assert.equal((await fetch(`${origin}${route}`)).status, 200, route);
  console.log(`PASS ${route}`);
}
assert.equal((await fetch(`${origin}/does-not-exist`)).status, 404);
const send = body => fetch(`${origin}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) });
assert.equal((await send({})).status, 400, 'Invalid contact form must be rejected');
assert.equal((await fetch(`${origin}/api/contact`, { method: 'POST', headers: { Origin: 'https://other.example' }, body: '{}' })).status, 403, 'Foreign origin must be rejected');
const result = await send({ name: 'Demo Visitor', email: 'visitor@example.test', topic: 'Support', message: 'Local delivery configuration check.', consent: 'on', website: '' });
assert.equal(result.status, 503, 'Unconfigured contact service must not claim delivery');
console.log('PASS contact validation, origin protection, and truthful delivery status');
console.log('All route checks passed.');
