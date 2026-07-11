import { test, expect } from '@playwright/test';
import { loginAndOpenBilling } from './billingTestSetup';

test.describe('Billing - Invoice scenarios', () => {
  test('should open an existing bill and create invoice from form', async ({ page }) => {
    const billingPage = await loginAndOpenBilling(page);

    await billingPage.openFirstBillFromList();
    await billingPage.verifyInvoiceActionButtons();

    await billingPage.clickCreateInvoice();
    await billingPage.verifyStatusFlowVisible();
  });

  test('should keep user on billing form when invoice prerequisites are incomplete', async ({ page }) => {
    const billingPage = await loginAndOpenBilling(page);

    await billingPage.openNewForm();
    await billingPage.verifyInvoiceActionButtons();

    await billingPage.clickCreateInvoice();

    await expect(billingPage.getPatientCombobox()).toBeVisible();
    await expect(billingPage.getAddLineButton()).toBeVisible();
  });
});
