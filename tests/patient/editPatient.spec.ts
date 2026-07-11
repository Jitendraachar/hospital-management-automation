import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { PatientPage } from '../../pages/PatientPage';

test.describe('Patient Module - Edit Patient', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should edit an existing patient contact details and persist changes', async ({ page }) => {
        const patientPage = new PatientPage(page);
        const patientName = 'PAT/00002';
        const updatedPhone = `8${String(Date.now()).slice(-9)}`;

        await loginAsValidUser(page);
        await patientPage.openList();
        await patientPage.expectListViewLoaded();

        await patientPage.search(patientName);
        await expect(patientPage.getRowByText(patientName)).toBeVisible();

        await patientPage.openPatientByText(patientName);
        await patientPage.updatePhone(updatedPhone);
        await patientPage.save();

        await expect(patientPage.getPhoneInput()).toHaveValue(updatedPhone);

        await patientPage.openList();
        await patientPage.search(updatedPhone);

        await expect(patientPage.getRowByText(updatedPhone)).toBeVisible();
    });
});
