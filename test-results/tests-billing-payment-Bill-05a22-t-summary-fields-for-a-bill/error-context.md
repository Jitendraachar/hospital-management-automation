# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\billing\payment.spec.ts >> Billing - Payment flow visibility >> should show payment summary fields for a bill
- Location: tests\billing\payment.spec.ts:26:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /New/i })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('button', { name: /New/i })

```

# Test source

```ts
  1  | import { test, expect, type Page } from 'playwright/test';
  2  | 
  3  | const BASE_URL = 'https://team40.qaaerp.com';
  4  | const USER_ID = 'team40';
  5  | const PASSWORD = 'vASPFtSh4d';
  6  | 
  7  | async function login(page: Page) {
  8  |   await page.goto(`${BASE_URL}/web/login?redirect=%2Fodoo%2Fweb%2Flogin%3F`);
  9  | 
  10 |   await page.getByRole('textbox', { name: /Email/i }).fill(USER_ID);
  11 |   await page.getByRole('textbox', { name: /Password/i }).fill(PASSWORD);
  12 |   await page.getByRole('button', { name: /Log in/i }).click();
  13 | 
  14 |   await expect(page).toHaveURL(/odoo/i);
  15 | }
  16 | 
  17 | async function openBilling(page: Page) {
  18 |   await page.goto(`${BASE_URL}/odoo/action-372/action-383`);
  19 |   await expect(page).toHaveURL(/\/odoo\/action-372\/action-383/);
  20 | 
  21 |   const newButton = page.getByRole('button', { name: /New/i });
> 22 |   await expect(newButton).toBeVisible({ timeout: 15000 });
     |                           ^ Error: expect(locator).toBeVisible() failed
  23 | }
  24 | 
  25 | test.describe('Billing - Payment flow visibility', () => {
  26 |   test('should show payment summary fields for a bill', async ({ page }) => {
  27 |     await login(page);
  28 |     await openBilling(page);
  29 | 
  30 |     const firstBill = page.getByRole('cell', {
  31 |       name: /^BILL\//,
  32 |     }).first();
  33 | 
  34 |     await expect(firstBill).toBeVisible();
  35 |     await firstBill.click();
  36 | 
  37 |     await expect(page.getByText('Invoice Total')).toBeVisible();
  38 |     await expect(page.getByText('Amount Paid')).toBeVisible();
  39 |     await expect(page.getByText('Amount Due')).toBeVisible();
  40 |     await expect(page.getByText('Total Amount')).toBeVisible();
  41 | 
  42 |     await expect(
  43 |       page
  44 |         .getByRole('radiogroup', { name: /Statusbar/i })
  45 |         .getByText(/Draft|Invoiced|Partially Paid|Paid/i)
  46 |         .first()
  47 |     ).toBeVisible();
  48 |   });
  49 | });
  50 | 
```