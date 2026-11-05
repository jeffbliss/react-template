import { expect, test } from '@playwright/test';

test('renders home route and increments counter', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'React Template' }),
  ).toBeVisible();
  await expect(page.getByText('Count: 0')).toBeVisible();

  await page.getByRole('button', { name: /increment/i }).click();
  await expect(page.getByText('Count: 1')).toBeVisible();
});
