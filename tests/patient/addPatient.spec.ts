import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { PatientPage } from '../../pages/PatientPage';

test.describe('Patient Module - Add Patient', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should create a new patient and show it in patient search results', async ({ page }) => {
        const patientPage = new PatientPage(page);
        const uniqueSuffix = Date.now();
        const patientName = `AutoPatient_${uniqueSuffix}`;

        await loginAsValidUser(page);
        await patientPage.openList();
        await patientPage.expectListViewLoaded();

        await patientPage.createPatient({
            name: patientName,
            phone: `9${String(uniqueSuffix).slice(-9)}`,
            email: `autopatient${uniqueSuffix}@mailinator.com`,
            address: 'Automation Address Line 1'
        });

        await expect(patientPage.getPatientNameInput()).toHaveValue(patientName);

        await patientPage.openList();
        await patientPage.search(patientName);

        await expect(patientPage.getRowByText(patientName)).toBeVisible();
    });
});
