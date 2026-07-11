import { test, expect, type Page } from 'playwright/test';

const BASE_URL = 'https://team40.qaaerp.com';
const USER_ID = 'team40';
const PASSWORD = 'vASPFtSh4d';

async function login(page: Page) {
  await page.goto(`${BASE_URL}/web/login?redirect=%2Fodoo%2Fweb%2Flogin%3F`);

  await page.getByRole('textbox', { name: /Email/i }).fill(USER_ID);
  await page.getByRole('textbox', { name: /Password/i }).fill(PASSWORD);
  await page.getByRole('button', { name: /Log in/i }).click();

  await expect(page).toHaveURL(/odoo/i);
}

async function openBilling(page: Page) {
  await page.goto(`${BASE_URL}/odoo/action-372/action-383`);
  await expect(page).toHaveURL(/\/odoo\/action-372\/action-383/);

  const newButton = page.getByRole('button', { name: /New/i });
  await expect(newButton).toBeVisible({ timeout: 15000 });
}

test.describe('Billing - Payment flow visibility', () => {
  test('should show payment summary fields for a bill', async ({ page }) => {
    await login(page);
    await openBilling(page);

    const firstBill = page.getByRole('cell', {
      name: /^BILL\//,
    }).first();

    await expect(firstBill).toBeVisible();
    await firstBill.click();

    await expect(page.getByText('Invoice Total')).toBeVisible();
    await expect(page.getByText('Amount Paid')).toBeVisible();
    await expect(page.getByText('Amount Due')).toBeVisible();
    await expect(page.getByText('Total Amount')).toBeVisible();

    await expect(
      page
        .getByRole('radiogroup', { name: /Statusbar/i })
        .getByText(/Draft|Invoiced|Partially Paid|Paid/i)
        .first()
    ).toBeVisible();
  });
});
