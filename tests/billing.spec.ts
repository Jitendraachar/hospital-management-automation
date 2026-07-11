import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../helpers/auth';
import { captureFailureScreenshot } from '../helpers/testHooks';
import { BillingPage } from '../pages/BillingPage';

test.describe('Billing Module', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should load billing list with core columns and controls', async ({ page }) => {
        const billingPage = new BillingPage(page);

        await loginAsValidUser(page);
        await billingPage.openList();

        await expect(page).toHaveURL(/\/action-383/);
        await expect(billingPage.getNewButton()).toBeVisible();
        await expect(billingPage.getSearchInput()).toBeVisible();
        await expect(billingPage.getBillNumberHeader()).toBeVisible();
        await expect(billingPage.getPatientHeader()).toBeVisible();
        await expect(billingPage.getTotalAmountHeader()).toBeVisible();
        await expect(billingPage.getStatusHeader()).toBeVisible();
    });

    test('should open new billing form with mandatory controls', async ({ page }) => {
        const billingPage = new BillingPage(page);

        await loginAsValidUser(page);
        await billingPage.openNewForm();

        await expect(page).toHaveURL(/\/action-383\/new/);
        await expect(billingPage.getPatientCombobox()).toBeVisible();
        await expect(billingPage.getIpdReferenceCombobox()).toBeVisible();
        await expect(billingPage.getAddLineButton()).toBeVisible();
        await expect(billingPage.getCreateInvoiceButton()).toBeVisible();
        await expect(billingPage.getReloadFromPatientButton()).toBeVisible();
        await expect(billingPage.getPrintInvoiceButton()).toBeVisible();
        await expect(billingPage.getSaveButton()).toBeVisible();
        await expect(billingPage.getDiscardButton()).toBeVisible();
    });

    test('should search billing by bill number', async ({ page }) => {
        const billingPage = new BillingPage(page);

        await loginAsValidUser(page);
        await billingPage.openList();
        await billingPage.search('BILL/00001');

        await expect(billingPage.getRowByText('BILL/00001')).toBeVisible();
    });

    test('should handle no-match billing search query safely', async ({ page }) => {
        const billingPage = new BillingPage(page);

        await loginAsValidUser(page);
        await billingPage.openList();
        await billingPage.search('NO_MATCH_BILL_001');

        await expect(page).toHaveURL(/\/action-383/);
        await expect(billingPage.getSearchInput()).toHaveValue('NO_MATCH_BILL_001');
    });

    test('should handle SQL-like payload in billing search without crashing', async ({ page }) => {
        const billingPage = new BillingPage(page);

        await loginAsValidUser(page);
        await billingPage.openList();
        await billingPage.search(`' OR '1'='1`);

        await expect(page).toHaveURL(/\/action-383/);
        await expect(billingPage.getSearchInput()).toHaveValue(`' OR '1'='1`);
    });
});
