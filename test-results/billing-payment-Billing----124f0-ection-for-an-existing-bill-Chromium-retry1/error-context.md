# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: billing\payment.spec.ts >> Billing - Payment scenarios >> should display payment summary section for an existing bill
- Location: tests\billing\payment.spec.ts:5:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Dashboard' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: 'Dashboard' })

```

# Test source

```ts
  1  | import { expect, type Page } from '@playwright/test';
  2  | import { LoginPage } from '../../LoginPage';
  3  | import { BillingPage } from '../../pages/BillingPage';
  4  | 
  5  | const USERNAME = 'team40';
  6  | const PASSWORD = 'vASPFtSh4d';
  7  | 
  8  | export async function loginAndOpenBilling(page: Page): Promise<BillingPage> {
  9  |   const loginPage = new LoginPage(page);
  10 |   const billingPage = new BillingPage(page);
  11 | 
  12 |   await loginPage.open();
  13 |   await loginPage.login(USERNAME, PASSWORD);
  14 | 
> 15 |   await expect(loginPage.getDashboardLink()).toBeVisible();
     |                                              ^ Error: expect(locator).toBeVisible() failed
  16 |   await billingPage.openList();
  17 | 
  18 |   return billingPage;
  19 | }
  20 | 
```