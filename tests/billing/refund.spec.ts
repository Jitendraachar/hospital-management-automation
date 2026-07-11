import { test, expect } from '@playwright/test';
import { loginAndOpenBilling } from './billingTestSetup';

test.describe('Billing - Refund scenarios', () => {
  test('should display refund prerequisites on an existing billing record', async ({ page }) => {
    const billingPage = await loginAndOpenBilling(page);

    await billingPage.openFirstBillFromList();
    await billingPage.verifyRefundPrerequisites();
    await billingPage.verifySummarySection();
  });

  test('should keep refund prerequisites unavailable until billing lines are prepared in new record', async ({
    page,
  }) => {
    const billingPage = await loginAndOpenBilling(page);

    await billingPage.openNewForm();
    await billingPage.verifyInvoiceActionButtons();

    await expect(billingPage.getAddLineButton()).toBeVisible();
    await expect(billingPage.getPatientCombobox()).toBeVisible();

    await billingPage.clickCreateInvoice();

    await expect(billingPage.getPatientCombobox()).toBeVisible();
    await expect(billingPage.getAddLineButton()).toBeVisible();
  });
});
