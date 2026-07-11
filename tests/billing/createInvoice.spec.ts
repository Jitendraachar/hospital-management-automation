import { test, expect, type Page } from 'playwright/test';

const BASE_URL = 'https://team40.qaaerp.com';
const USER_ID = 'team40';
const PASSWORD = 'vASPFtSh4d';

async function login(page: Page) {
  await page.goto(`${BASE_URL}/web/login?redirect=%2Fodoo%2Fweb%2Flogin%3F`);
  await page.getByRole('textbox', { name: 'Email' }).fill(USER_ID);
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/\/odoo\//);
}

async function openBilling(page: Page) {
  const billingsLink = page.getByRole('link', { name: /Billings/i });
  await expect(billingsLink.first()).toBeVisible();
  await billingsLink.first().click();

  await expect(page.getByRole('button', { name: 'New' })).toBeVisible();
  await expect(page.getByText('Billing', { exact: false })).toBeVisible();
}

test.describe('Billing - Create Invoice', () => {
  test('should open existing draft bill and create invoice', async ({ page }) => {
    await login(page);
    await openBilling(page);

    const firstBillLink = page.getByRole('cell', { name: /^BILL\// }).first();
    await expect(firstBillLink).toBeVisible();
    await firstBillLink.click();

    await expect(page.getByRole('button', { name: 'Create Invoice' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Print Invoice' })).toBeVisible();

    await page.getByRole('button', { name: 'Create Invoice' }).click();

    await expect(
      page
        .getByRole('radiogroup', { name: 'Statusbar' })
        .getByText(/Draft|Invoiced|Partially Paid|Paid/i)
        .first(),
    ).toBeVisible();
  });
});
