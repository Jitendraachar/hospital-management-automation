import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { PrescriptionPage } from '../../pages/Prescription/PrescriptionPage';

test.describe('Prescription Module - Print Prescription', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should expose print controls from prescription form and actions menu', async ({ page }) => {
        const prescriptionPage = new PrescriptionPage(page);

        await loginAsValidUser(page);
        await prescriptionPage.openList();
        await prescriptionPage.expectListViewLoaded();

        await prescriptionPage.clickNew();
        await prescriptionPage.expectCreateFormLoaded();

        await expect(prescriptionPage.getPrintPrescriptionButton()).toBeVisible();

        await prescriptionPage.openFormActionsMenu();
        await expect(prescriptionPage.getPrintReportMenuItem()).toBeVisible();
        await expect(prescriptionPage.getDuplicateMenuItem()).toBeVisible();

        await prescriptionPage.discard();
        await prescriptionPage.expectListViewLoaded();
    });
});
