import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { PrescriptionPage } from '../../pages/Prescription/PrescriptionPage';

test.describe('Prescription Module - Add Prescription', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should open new prescription form with mandatory controls and support discard safely', async ({ page }) => {
        const prescriptionPage = new PrescriptionPage(page);

        await loginAsValidUser(page);
        await prescriptionPage.openList();
        await prescriptionPage.expectListViewLoaded();

        await prescriptionPage.clickNew();
        await prescriptionPage.expectCreateFormLoaded();

        await expect(prescriptionPage.getPatientCombobox()).toBeVisible();
        await expect(prescriptionPage.getAppointmentCombobox()).toBeVisible();
        await expect(prescriptionPage.getQtyInput()).toBeVisible();
        await expect(prescriptionPage.getPrescriptionNotesInput()).toBeVisible();

        await prescriptionPage.fillForm({
            notes: 'Automation draft note - discard validation.'
        });

        await prescriptionPage.discard();
        await prescriptionPage.expectListViewLoaded();
    });
});
