import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { DoctorPage } from '../../pages/doctor';

test.describe('Doctor Module - Search Doctor', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should search existing doctor by name', async ({ page }) => {
        const doctorPage = new DoctorPage(page);

        await loginAsValidUser(page);
        await doctorPage.openList();
        await doctorPage.expectListViewLoaded();

        await doctorPage.search('doc1');

        await expect(doctorPage.getRowByText('doc1')).toBeVisible();
    });

    test('should handle no-match doctor search safely', async ({ page }) => {
        const doctorPage = new DoctorPage(page);

        await loginAsValidUser(page);
        await doctorPage.openList();
        await doctorPage.expectListViewLoaded();

        await doctorPage.search('NO_MATCH_DOCTOR_001');

        await expect(doctorPage.getRowByText('NO_MATCH_DOCTOR_001')).toHaveCount(0);
    });

    test('should handle SQL-like payload in doctor search without breaking page', async ({ page }) => {
        const doctorPage = new DoctorPage(page);
        const payload = `' OR '1'='1`;

        await loginAsValidUser(page);
        await doctorPage.openList();
        await doctorPage.expectListViewLoaded();

        await doctorPage.search(payload);

        await expect(page).toHaveURL(/action-372\/action-375/);
    });
});
