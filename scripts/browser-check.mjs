import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:3000';
await mkdir('.qa', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer', '--disable-gpu-compositing', '--in-process-gpu'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
page.setDefaultTimeout(10000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await page.goto(`${origin}/?utm_source=local-check`);
  await page.getByRole('heading', { level: 1 }).waitFor();
  await page.locator('header a[href*="utm_source=local-check"]').waitFor();
  await page.screenshot({ path: '.qa/home-desktop.png', fullPage: true });
  const demo = page.getByRole('tablist');
  await demo.locator('#demo-tab-1').click();
  await page.getByRole('tabpanel').getByLabel('Name', { exact: true }).fill('Taylor Demo');
  await demo.locator('#demo-tab-1').press('ArrowDown');
  assert.equal(await demo.getByRole('tab', { selected: true }).textContent(), '03Keep the context');
  await demo.locator('#demo-tab-3').click();
  assert.ok(await page.getByText('You review and send. Always.').isVisible());
  await page.locator('summary').filter({ hasText: 'Does CardPulse send emails automatically?' }).click();
  assert.ok(await page.getByText('No. CardPulse creates personalized follow-up drafts.', { exact: false }).isVisible());
  console.log('PASS demo keyboard navigation, editable fields, draft stage, FAQ, campaign attribution');
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/how-it-works', '/pricing', '/privacy-security', '/about', '/contact', '/privacy', '/terms', '/data-deletion']) {
      await page.goto(`${origin}${path}`);
      await page.getByRole('heading', { level: 1 }).waitFor();
      const overflow = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: innerWidth }));
      assert.ok(overflow.content <= overflow.viewport + 1, `Overflow on ${path} at ${width}: ${JSON.stringify(overflow)}`);
      if (path === '/' && width <= 640) {
        const preview = await page.locator('.hero-workflow').boundingBox();
        assert.ok(preview && preview.x >= 0 && preview.x + preview.width <= width, `Mobile product preview must fit at ${width}px`);
      }
    }
    console.log(`PASS all nine routes at ${width}px: no horizontal overflow`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin);
  await page.screenshot({ path: '.qa/home-mobile.png', fullPage: true });
  await page.screenshot({ path: '.qa/home-mobile-viewport.png' });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  assert.ok(await page.getByRole('navigation', { name: 'Mobile navigation' }).isVisible());
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'), 'false');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Pricing' }).click();
  await page.waitForURL('**/pricing');
  assert.equal(await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'), 'false');
  await page.goto(`${origin}/contact?topic=Privacy`);
  await page.getByLabel('What’s on your mind?').selectOption('Privacy');
  await page.getByLabel('Your name').fill('Demo Visitor');
  await page.getByLabel('Email address').fill('visitor@example.test');
  await page.getByLabel('Your message').fill('Checking the local unconfigured form behavior.');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Send message' }).click();
  await page.getByRole('status').filter({ hasText: 'Message not sent' }).waitFor();
  console.log('PASS mobile menu, Escape focus return, route navigation, and contact error state');
  assert.deepEqual(errors, [], 'Browser runtime errors');
  console.log('PASS no browser runtime errors');
} finally { await browser.close(); }
