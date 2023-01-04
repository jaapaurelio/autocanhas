import { test, expect } from "@playwright/test";

test("should have all required elements", async ({ page }) => {
  await page.goto("/");

  const topMenu = await page.getByTestId("top-menu");
  const topMenuLinks = await topMenu.locator("> a");
  const newCarsSection = await page.getByTestId("new-cars-section");
  const newCars = await newCarsSection.getByTestId("car-item");

  // Validate page header
  await topMenu.isVisible();
  await expect(topMenuLinks).toHaveCount(4);

  await expect(topMenuLinks.nth(0)).toHaveText("Início");
  await expect(topMenuLinks.nth(0)).toHaveAttribute("href", "/");

  await expect(topMenuLinks.nth(1)).toHaveText("Viaturas");
  await expect(topMenuLinks.nth(1)).toHaveAttribute("href", "/viaturas");

  await expect(topMenuLinks.nth(2)).toHaveText("Oficina");
  await expect(topMenuLinks.nth(2)).toHaveAttribute("href", "/oficina");

  await expect(topMenuLinks.nth(3)).toHaveText("Contato");
  await expect(topMenuLinks.nth(3)).toHaveAttribute("href", "/contato");

  // Validate new cars section
  await newCarsSection.isVisible();
  await expect(newCars).toHaveCount(3);
  await expect(
    await newCars.nth(0).locator("> a").getAttribute("href")
  ).toContain("/viaturas");
  await expect(
    await newCars.nth(0).getByTestId("car-item-title")
  ).toBeVisible();
  await expect(
    await newCars.nth(0).getByTestId("car-item-price")
  ).toBeVisible();

  await expect(await newCarsSection.getByTestId("show-all-btn")).toBeVisible();
});
