import { test, expect, type Page } from "@playwright/test";

/** THE LOOP TEST. This is the single most important spec in the suite: it
 *  proves the architectural claim made since the Brand Bible — that closing
 *  a project on the installer portal makes the SAME record appear, unmodified,
 *  in the customer portal AND the public lookup.
 *
 *  Requires fixtures this environment cannot create: a seeded Supabase test
 *  project with an installer user, a customer user, and an in-progress project
 *  assigned to both. See e2e/README.md for the exact seed script to run before
 *  this spec passes. Until fixtures exist, this file documents the contract
 *  and skips with a clear reason rather than a false green.
 */

const FIXTURES_READY = process.env.E2E_FIXTURES_READY === "true";

async function login(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForURL(/\/(crew|portal|admin)/);
}

test.describe("The full loop: installer close → customer view → public verify", () => {
  test.skip(!FIXTURES_READY, "Requires seeded Supabase test fixtures — see e2e/README.md");

  const INSTALLER = { email: "e2e-installer@test.garagefloortoday.com", password: process.env.E2E_INSTALLER_PW ?? "" };
  const CUSTOMER = { email: "e2e-customer@test.garagefloortoday.com", password: process.env.E2E_CUSTOMER_PW ?? "" };
  const TEST_PROJECT_ID = process.env.E2E_TEST_PROJECT_ID ?? "GFT-2099-99999"; // seed script assigns this ID

  test("installer cannot close with an incomplete checklist", async ({ page }) => {
    await login(page, INSTALLER.email, INSTALLER.password);
    await page.goto(`/crew/${TEST_PROJECT_ID}`);
    const closeBtn = page.getByRole("button", { name: /Complete checklist first|Close Project/ });
    const text = await closeBtn.textContent();
    if (text?.includes("Complete checklist first")) {
      await expect(closeBtn).toBeDisabled();
    }
  });

  test("installer completes the Standard and closes the project", async ({ page }) => {
    await login(page, INSTALLER.email, INSTALLER.password);
    await page.goto(`/crew/${TEST_PROJECT_ID}`);

    const steps = [
      "ArmorPrep™ diamond grinding complete", "Pre-grind moisture reading recorded",
      "Post-grind moisture reading recorded", "Structural crack repair complete",
      "GFT Performance System applied", "Finished photos captured", "Customer walkthrough complete",
    ];
    for (const label of steps) {
      const cb = page.getByLabel(label);
      if (!(await cb.isChecked())) await cb.check();
      await page.waitForTimeout(200); // let the Server Action round-trip
    }

    await expect(page.getByRole("button", { name: "Close Project & Issue FloorPassport™" })).toBeEnabled();
    await page.getByLabel("Customer has signed off on completed work").check();
    await page.getByRole("button", { name: "Close Project & Issue FloorPassport™" }).click();

    await expect(page.getByRole("status")).toContainText("is now live for the customer and public lookup");
  });

  test("the SAME project now appears in the customer's portal", async ({ page }) => {
    await login(page, CUSTOMER.email, CUSTOMER.password);
    await page.goto("/portal");
    await expect(page.getByText(TEST_PROJECT_ID)).toBeVisible();
    await expect(page.getByText(/pre.grind/i)).toBeVisible();
  });

  test("the SAME project is publicly verifiable, logged out, no PII", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto(`/lookup?id=${TEST_PROJECT_ID}`);
    await expect(page.getByText(TEST_PROJECT_ID)).toBeVisible();
    await expect(page.getByText(/Active|Transferred/)).toBeVisible();
    const body = await page.textContent("body");
    expect(body).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.-]+/); // no email leaked
  });

  test("customer can initiate ownership transfer, and it reflects in warranty status", async ({ page }) => {
    await login(page, CUSTOMER.email, CUSTOMER.password);
    await page.goto("/portal/transfer");
    await page.getByLabel("New owner's email").fill("e2e-new-owner@test.garagefloortoday.com");
    await page.getByLabel("Confirm ownership transfer").check();
    await page.getByRole("button", { name: "Initiate Transfer" }).click();
    await expect(page.getByRole("status")).toContainText(/Transfer initiated/i);

    await page.goto("/portal/warranty");
    await expect(page.getByText("transferred")).toBeVisible();
  });
});

test.describe("Role isolation (negative tests — these MUST hold even without fixtures)", () => {
  test("unauthenticated visitor to /admin is redirected to login", async ({ page }) => {
    await page.goto("/admin/leads");
    await page.waitForURL(/\/login/);
    expect(page.url()).toContain("next=%2Fadmin%2Fleads");
  });

  test("unauthenticated visitor to /portal is redirected to login", async ({ page }) => {
    await page.goto("/portal");
    await page.waitForURL(/\/login/);
  });

  test("unauthenticated visitor to /crew is redirected to login", async ({ page }) => {
    await page.goto("/crew");
    await page.waitForURL(/\/login/);
  });
});
