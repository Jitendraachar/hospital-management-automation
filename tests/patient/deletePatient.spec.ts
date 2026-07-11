import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { PatientPage } from '../../pages/PatientPage';

test.describe('Patient Module - Delete Patient', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should delete a patient from actions menu and remove it from list search', async ({ page }) => {
        const patientPage = new PatientPage(page);
        const uniqueSuffix = Date.now();
        const patientName = `DeletePatient_${uniqueSuffix}`;

        await loginAsValidUser(page);
        await patientPage.openList();
        await patientPage.expectListViewLoaded();

        await patientPage.createPatient({
            name: patientName,
            phone: `9${String(uniqueSuffix).slice(-9)}`,
            email: `deletepatient${uniqueSuffix}@mailinator.com`,
            address: 'Delete Flow Address'
        });

        await expect(patientPage.getPatientNameInput()).toHaveValue(patientName);

        await patientPage.deleteFromActionsMenu();

        await patientPage.openList();
        await patientPage.search(patientName);

        await expect(patientPage.getRowByText(patientName)).toHaveCount(0);
    });
});
