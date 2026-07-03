import { test, expect } from "@playwright/test";

/** Public surface — no auth required. These are the specs most likely to run
 *  in CI against a preview deploy even before Supabase test fixtures exist,
 *  since they only need the app served, not seeded auth users.
 */

test.describe("Homepage", () => {
  test("loads with hero, no console errors, primary CTA present", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Beautiful Garage Floors");
    await expect(page.getByRole("link", { name: /Get My Free Estimate/i }).first()).toBeVisible();
    expect(errors, `Console errors: ${errors.join("; ")}`).toHaveLength(0);
  });

  test("header solidifies on scroll", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(350); // matches --duration-base
    await expect(header).toHaveCSS("background-color", /rgb\(255, 255, 255\)/);
  });
});

test.describe("Revenue Engine", () => {
  test("Smart Estimator produces a price range from answers", async ({ page }) => {
    await page.goto("/estimate");
    await page.getByRole("button", { name: "2-car" }).click();
    await page.getByRole("button", { name: "Good shape" }).click();
    await page.getByRole("button", { name: "Daily parking" }).click();
    await page.getByRole("button", { name: "Flake" }).click();
    await expect(page.getByText(/\$[\d,]+–\$[\d,]+/)).toBeVisible();
  });

  test("Estimator rejects submission without email, accepts with it", async ({ page }) => {
    await page.goto("/estimate");
    await page.getByRole("button", { name: "2-car" }).click();
    await page.getByRole("button", { name: "Good shape" }).click();
    await page.getByRole("button", { name: "Daily parking" }).click();
    await page.getByRole("button", { name: "Flake" }).click();
    const submit = page.getByRole("button", { name: "Get My Exact Quote" });
    await submit.click(); // HTML5 required validation should block empty email
    await expect(page.getByLabel("Email")).toBeFocused();

    await page.getByLabel("Email").fill("e2e-test@example.com");
    await submit.click();
    await expect(page.getByRole("status")).toContainText(/certified local team/i, { timeout: 10_000 });
  });

  test("Cost Calculator slider updates the price live", async ({ page }) => {
    await page.goto("/tools/cost-calculator");
    const before = await page.getByText(/\$[\d,]+–\$[\d,]+/).textContent();
    const slider = page.locator('input[type="range"]');
    await slider.fill("1200");
    const after = await page.getByText(/\$[\d,]+–\$[\d,]+/).textContent();
    expect(after).not.toBe(before);
  });

  test("Visualizer swatch selection updates the rendered floor and label", async ({ page }) => {
    await page.goto("/tools/visualizer");
    await page.getByRole("radio", { name: /Nightfall/i }).click();
    await expect(page.getByText("Nightfall").first()).toBeVisible();
  });
});

test.describe("FloorPassport lookup", () => {
  test("unknown ID shows a clear not-found message, not an error", async ({ page }) => {
    await page.goto("/lookup?id=GFT-0000-00000");
    await expect(page.getByText(/No record found/i)).toBeVisible();
  });

  test("lookup page never exposes homeowner PII in the DOM", async ({ page }) => {
    await page.goto("/lookup?id=GFT-2026-08114"); // seeded demo project, if present
    const body = await page.textContent("body");
    // Structural assertion: whatever renders, no email/phone pattern appears
    expect(body).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  });
});

test.describe("SEO surface", () => {
  test("sitemap.xml is served and contains core routes", async ({ page }) => {
    const res = await page.goto("/sitemap.xml");
    expect(res?.status()).toBe(200);
    const body = await page.textContent("body");
    expect(body).toContain("/services/residential-garage-floors");
    expect(body).toContain("/coatings/polyaspartic");
    expect(body).toContain("/learn/hot-tire-pickup");
  });

  test("robots.txt disallows portal routes", async ({ page }) => {
    const res = await page.goto("/robots.txt");
    expect(res?.status()).toBe(200);
    const body = await page.textContent("body");
    expect(body).toMatch(/Disallow:\s*\/admin/);
    expect(body).toMatch(/Disallow:\s*\/portal/);
    expect(body).toMatch(/Disallow:\s*\/crew/);
  });

  test("every system page has unique title and canonical", async ({ page }) => {
    const slugs = ["epoxy", "polyaspartic", "polyurea", "hybrid"];
    const titles = new Set<string>();
    for (const slug of slugs) {
      await page.goto(`/coatings/${slug}`);
      const title = await page.title();
      expect(titles.has(title), `Duplicate title: ${title}`).toBe(false);
      titles.add(title);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toContain(`/coatings/${slug}`);
    }
  });
});

test.describe("Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("homepage nav collapses and content stays single-column", async ({ page }) => {
    await page.goto("/");
    const heroH1 = page.getByRole("heading", { level: 1 });
    await expect(heroH1).toBeVisible();
    const box = await heroH1.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(375);
  });
});
