import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { PrescriptionPage } from '../../pages/Prescription/PrescriptionPage';

test.describe('Prescription Module - Search', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should handle no-match prescription search safely', async ({ page }) => {
        const prescriptionPage = new PrescriptionPage(page);
        const impossibleSearchTerm = `NO_MATCH_RX_${Date.now()}`;

        await loginAsValidUser(page);
        await prescriptionPage.openList();
        await prescriptionPage.expectListViewLoaded();

        await prescriptionPage.search(impossibleSearchTerm);
        await expect(prescriptionPage.getSearchInput()).toHaveValue(impossibleSearchTerm);
        await expect(prescriptionPage.getRowByText(impossibleSearchTerm)).not.toBeVisible();

        await prescriptionPage.clearSearch();
        await expect(prescriptionPage.getSearchInput()).toHaveValue('');
    });
});
