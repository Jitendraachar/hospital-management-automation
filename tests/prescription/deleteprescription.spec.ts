import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { PrescriptionPage } from '../../pages/Prescription/PrescriptionPage';

test.describe('Prescription Module - Delete Prescription', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should delete an existing prescription from actions menu when delete is available', async ({ page }) => {
        const prescriptionPage = new PrescriptionPage(page);

        await loginAsValidUser(page);
        await prescriptionPage.openList();
        await prescriptionPage.expectListViewLoaded();

        const hasData = await prescriptionPage.hasAnyListRecord();
        test.skip(!hasData, 'No prescription records available to delete.');

        await prescriptionPage.openFirstListRecord();
        await prescriptionPage.expectCreateFormLoaded();

        const deleted = await prescriptionPage.deleteOpenedRecordIfAvailable();
        test.skip(!deleted, 'Delete option is not available for the opened prescription record.');

        await prescriptionPage.expectListViewLoaded();

        await expect(prescriptionPage.getNewButton()).toBeVisible();
        await expect(prescriptionPage.getSearchInput()).toBeVisible();
    });
});
