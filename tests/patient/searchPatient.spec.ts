import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { PatientPage } from '../../pages/PatientPage';

test.describe('Patient Module - Search Patient', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should search existing patient by UHID', async ({ page }) => {
        const patientPage = new PatientPage(page);

        await loginAsValidUser(page);
        await patientPage.openList();
        await patientPage.expectListViewLoaded();

        await patientPage.search('PAT/00002');

        await expect(patientPage.getRowByText('PAT/00002')).toBeVisible();
    });

    test('should handle no-match patient search safely', async ({ page }) => {
        const patientPage = new PatientPage(page);

        await loginAsValidUser(page);
        await patientPage.openList();
        await patientPage.expectListViewLoaded();

        await patientPage.search('NO_MATCH_PATIENT_001');

        await expect(patientPage.getSearchInput()).toHaveValue('NO_MATCH_PATIENT_001');
        await expect(patientPage.getRowByText('NO_MATCH_PATIENT_001')).toHaveCount(0);
    });

    test('should handle SQL-like payload in search without breaking page', async ({ page }) => {
        const patientPage = new PatientPage(page);
        const payload = `' OR '1'='1`;

        await loginAsValidUser(page);
        await patientPage.openList();
        await patientPage.expectListViewLoaded();

        await patientPage.search(payload);

        await expect(patientPage.getSearchInput()).toHaveValue(payload);
        await expect(page).toHaveURL(/action-372\/action-374/);
    });
});
