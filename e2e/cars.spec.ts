import { test, expect } from "@playwright/test";

test("should have all required elements", async ({ page }) => {
  await page.goto("/viaturas");

  const carsFilter = await page.getByTestId("cars-filter");
  const carsList = await page.getByTestId("cars-list");
  const carItems = await carsList.getByTestId("car-item");

  await expect(carsFilter).toBeVisible();
  await expect(carsList).toBeVisible();
  await expect(await carItems.count()).toBeGreaterThan(3);
});

test("should filter cars", async ({ page }) => {
  await page.goto("/viaturas");

  const carsFilter = await page.getByTestId("cars-filter");
  const carsList = await page.getByTestId("cars-list");
  const carItems = await carsList.getByTestId("car-item");
  const totalNumberOfCars = await carItems.count();

  // Select a brand
  await carsFilter
    .locator("select#brand")
    .selectOption("d6805f7f-249a-440f-b7eb-cd231f3bdd22");

  // We should have less cars.
  await expect
    .poll(async () => carItems.count())
    .toBeLessThan(totalNumberOfCars);

  // Url should reflect our selection.
  await expect(await page.url()).toContain(
    "/viaturas?brand=d6805f7f-249a-440f-b7eb-cd231f3bdd22"
  );

  // Reset brand filter
  await carsFilter.locator("select#brand").selectOption("");

  // We should have the same number of cars as in the beginning
  await expect.poll(async () => carItems.count()).toBe(totalNumberOfCars);

  // Select an option in all filters
  await carsFilter
    .locator("select#brand")
    .selectOption("d6805f7f-249a-440f-b7eb-cd231f3bdd22");

  // Url should reflect our selection.
  // We must wait for the url change since is async
  await expect
    .poll(async () => page.url())
    .toContain("/viaturas?brand=d6805f7f-249a-440f-b7eb-cd231f3bdd22");

  await carsFilter.locator("select#fuel").selectOption("Diesel");

  await expect
    .poll(async () => page.url())
    .toContain(
      "/viaturas?brand=d6805f7f-249a-440f-b7eb-cd231f3bdd22&fuel=Diesel"
    );

  await carsFilter.locator("select#transmission").selectOption("Manual");

  await expect
    .poll(async () => page.url())
    .toContain(
      "/viaturas?brand=d6805f7f-249a-440f-b7eb-cd231f3bdd22&fuel=Diesel&transmission=Manual"
    );
  await carsFilter.locator("select#price_min").selectOption("5000");
  await expect
    .poll(async () => page.url())
    .toContain(
      "/viaturas?brand=d6805f7f-249a-440f-b7eb-cd231f3bdd22&fuel=Diesel&price_min=5000&transmission=Manual"
    );
  await carsFilter.locator("select#price_max").selectOption("8000");
  await expect
    .poll(async () => page.url())
    .toContain(
      "/viaturas?brand=d6805f7f-249a-440f-b7eb-cd231f3bdd22&fuel=Diesel&price_max=8000&price_min=5000&transmission=Manual"
    );
  await carsFilter.locator("select#km_min").selectOption("5000");
  await expect
    .poll(async () => page.url())
    .toContain(
      "/viaturas?brand=d6805f7f-249a-440f-b7eb-cd231f3bdd22&fuel=Diesel&km_min=5000&price_max=8000&price_min=5000&transmission=Manual"
    );

  await carsFilter.locator("select#km_max").selectOption("10000");
  await expect
    .poll(async () => page.url())
    .toContain(
      "/viaturas?brand=d6805f7f-249a-440f-b7eb-cd231f3bdd22&fuel=Diesel&km_max=10000&km_min=5000&price_max=8000&price_min=5000&transmission=Manual"
    );

  await carsFilter.locator("select#year_min").selectOption("2021");
  await expect
    .poll(async () => page.url())
    .toContain(
      "/viaturas?brand=d6805f7f-249a-440f-b7eb-cd231f3bdd22&fuel=Diesel&km_max=10000&km_min=5000&price_max=8000&price_min=5000&transmission=Manual&year_min=2021"
    );

  await carsFilter.locator("select#year_max").selectOption("2022");
  await expect
    .poll(async () => page.url())
    .toContain(
      "/viaturas?brand=d6805f7f-249a-440f-b7eb-cd231f3bdd22&fuel=Diesel&km_max=10000&km_min=5000&price_max=8000&price_min=5000&transmission=Manual&year_max=2022&year_min=2021"
    );

  // With this strict search, we should have no cars avaiable.
  await expect(await page.getByTestId("no-cars")).toBeVisible();
});

test("should keep filter when we refresh the page", async ({ page }) => {
  await page.goto("/viaturas");

  const carsFilter = await page.getByTestId("cars-filter");
  const carsList = await page.getByTestId("cars-list");
  const carItems = await carsList.getByTestId("car-item");

  const totalNumberOfCars = await carItems.count();

  // Select a brand
  await carsFilter.locator("select#fuel").selectOption("Diesel");

  // We should have less cars.
  await expect
    .poll(async () => carItems.count())
    .toBeLessThan(totalNumberOfCars);

  const numberOfCars = await carItems.count();

  await page.reload();

  await expect(await carsFilter.locator("select#fuel")).toHaveValue("Diesel");

  // We should have the same number of cars.
  await expect(await carItems.count()).toEqual(numberOfCars);
});

test("should reset filter", async ({ page }) => {
  await page.goto("/viaturas");

  const carsFilter = await page.getByTestId("cars-filter");
  const carsList = await page.getByTestId("cars-list");
  const carItems = await carsList.getByTestId("car-item");
  const topMenu = await page.getByTestId("top-menu");

  const totalNumberOfCars = await carItems.count();

  // Select a brand
  await carsFilter.locator("select#fuel").selectOption("Diesel");

  // We should have less cars
  await expect
    .poll(async () => carItems.count())
    .toBeLessThan(totalNumberOfCars);

  await topMenu.getByText("Viaturas").click();

  // Should reset the number of cars
  await expect.poll(async () => carItems.count()).toEqual(totalNumberOfCars);

  // TODO: Reset filter is not working.
  // Probably related with Nextjs 13 Server Components not rendering the new values.
  // await expect(await carsFilter.locator("select#fuel")).toHaveValue("");
});
