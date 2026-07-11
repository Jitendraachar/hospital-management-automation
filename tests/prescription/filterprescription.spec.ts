import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { PrescriptionPage } from '../../pages/Prescription/PrescriptionPage';

test.describe('Prescription Module - Filter', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should open filter dropdown and show core filter/group/favorite controls', async ({ page }) => {
        const prescriptionPage = new PrescriptionPage(page);

        await loginAsValidUser(page);
        await prescriptionPage.openList();
        await prescriptionPage.expectListViewLoaded();

        await prescriptionPage.openSearchOptions();
        await prescriptionPage.expectSearchOptionsVisible();

        await expect(prescriptionPage.getCustomFilterMenuItem()).toBeVisible();
        await expect(prescriptionPage.getGroupByCombobox()).toBeVisible();
        await expect(prescriptionPage.getSaveCurrentSearchButton()).toBeVisible();
    });
});
