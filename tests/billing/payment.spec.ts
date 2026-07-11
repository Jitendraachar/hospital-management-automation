import { test, expect } from '@playwright/test';
import { loginAndOpenBilling } from './billingTestSetup';

test.describe('Billing - Payment scenarios', () => {
  test('should display payment summary section for an existing bill', async ({ page }) => {
    const billingPage = await loginAndOpenBilling(page);

    await billingPage.openFirstBillFromList();
    await billingPage.verifySummarySection();
    await billingPage.verifyStatusFlowVisible();
  });

  test('should show zeroed payment summary on a new billing form before invoice creation', async ({ page }) => {
    const billingPage = await loginAndOpenBilling(page);

    await billingPage.openNewForm();
    await billingPage.verifySummarySection();

    await expect(page.getByText('0.00').first()).toBeVisible();
    await expect(billingPage.getCreateInvoiceButton()).toBeVisible();
  });
});
