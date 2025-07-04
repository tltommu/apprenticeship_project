import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const APP_URL = 'http://localhost:4200/';  // or the deployed URL

const BRAND = {
  green : '#89c82e',   // valid
  pink  : '#700064',   // invalid
  grey  : '#3c3c3b',   // neutral text / disabled
};

test.describe('E2E – visual & accessibility acceptance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_URL);
  });

  // TC007 – Brand colours + contrast                                       
  test('TC007: brand colours appear & hit WCAG contrast', async ({ page }) => {
    const name   = page.locator('input[name="name"]');
    const email  = page.locator('input[name="email"]');

    /* Trigger VALID + INVALID */
    await name.fill('Tommy Lam');          // valid  → border should be green
    await email.fill('bad-email');         // invalid → border should be pink

    /* Use evaluate to read computedStyle.borderColor */
    const validBorder   = await name.evaluate(el => getComputedStyle(el).borderColor);
    const invalidBorder = await email.evaluate(el => getComputedStyle(el).borderColor);

    expect(validBorder.toLowerCase()).toBe(BRAND.green);
    expect(invalidBorder.toLowerCase()).toBe(BRAND.pink);

    /* Contrast – quick ratio check (luminance algorithm) */
    const text = page.locator('label[for="name"]');
    const textColor = await text.evaluate(el => getComputedStyle(el).color);
    const bgColor   = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    const contrast = ratio(textColor, bgColor);   // helper below
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });

  // TC008 – Typography, centred wrapper, padding                           
  test('TC008: layout uses Calibri & is centred', async ({ page }) => {
    const wrapper = page.locator('main, .wrapper, .container').first();
    const font = await wrapper.evaluate(el => getComputedStyle(el).fontFamily);

    expect(font.toLowerCase()).toContain('calibri');

    /* centring: bounding box roughly centred in viewport */
    const vp   = await page.viewportSize();
    const box  = await wrapper.boundingBox();
    expect(box).not.toBeNull();

    const marginLeft = box!.x;
    const marginRight = vp!.width - (box!.x + box!.width);
    /* allow ±10 px tolerance */
    expect(Math.abs(marginLeft - marginRight)).toBeLessThanOrEqual(10);

    /* padding at least 16 px */
    const padding = await wrapper.evaluate(el => parseFloat(getComputedStyle(el).padding));
    expect(padding).toBeGreaterThanOrEqual(16);
  });

  // TC010 – W3C a11y with axe-core & keyboard nav                          
  test('TC010: passes axe-core & keyboard traversal', async ({ page }) => {
    const a11y = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])     // strict scan
      .analyze();
    expect(a11y.violations, JSON.stringify(a11y.violations, null, 2)).toEqual([]);

    /* keyboard tab order – first three tabbable elements are our inputs */
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="name"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="email"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="card"]')).toBeFocused();

    /* focus ring visible? quick check for outline‑width */
    const outline = await page.evaluate(
      () => getComputedStyle(document.activeElement!).outlineWidth
    );
    expect(parseFloat(outline)).toBeGreaterThan(0);
  });

  // TC014 – Responsive break‑point audit                                   
  const viewports = [
    { w: 320,  h: 640 },  // small mobile
    { w: 576,  h: 768 },  // small tablet
    { w: 768,  h: 900 },  // iPad portrait
    { w: 992,  h: 900 },  // landscape tablet / small laptop
    { w: 1200, h: 900 },  // desktop
    { w: 1400, h: 900 },  // wide desktop
  ];

  for (const v of viewports) {
    test(`TC014: responsive at ${v.w}px`, async ({ browser }) => {
      const ctx  = await browser.newContext({ viewport: { width: v.w, height: v.h } });
      const page = await ctx.newPage();
      await page.goto(APP_URL);

      /* No horizontal scrollbar – indicates content overflow */
      const hasHScroll = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasHScroll).toBeFalsy();

      /* Basic visual regression (optional) */
      // expect(await page.screenshot()).toMatchSnapshot(`viewport-${v.w}.png`);
    });
  }
});

//Helper – WCAG contrast ratio (YIQ luminance)                              
function ratio(fg: string, bg: string): number {
  const [r1, g1, b1] = parseRGB(fg);
  const [r2, g2, b2] = parseRGB(bg);
  const L = (r: number, g: number, b: number) => {
    const toLin = (c: number) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
  };
  const L1 = L(r1, g1, b1);
  const L2 = L(r2, g2, b2);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

function parseRGB(rgb: string): [number, number, number] {
  const m = rgb.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
  return [m[0], m[1], m[2]];
}
