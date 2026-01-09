import { test, expect } from '@playwright/test';

test('user gets weather data', async ({ page }) => {
  await page.goto('http://localhost:4200');

  const map = page.locator('#map');
  await expect(map).toBeVisible();

  await map.click({
    position: { x: 200, y: 200 },
  });

  const latInput = page.getByPlaceholder('Latitude');
  const lonInput = page.getByPlaceholder('Longitude');

  await expect(latInput).not.toHaveValue('');
  await expect(lonInput).not.toHaveValue('');

  const spinner = page.locator('.spinner');
  await expect(spinner).toBeVisible();

  const resultCard = page.locator('.result-card');
  await expect(resultCard).toBeVisible();

  await expect(resultCard).toContainText('City:');
  await expect(resultCard).toContainText('Temp:');
  await expect(resultCard).toContainText('Hmd:');
});
