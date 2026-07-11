import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { PrescriptionPage } from '../../pages/Prescription/PrescriptionPage';

test.describe('Prescription Module - Update Prescription', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should update medicine instructions for an existing prescription and save successfully', async ({ page }) => {
        const prescriptionPage = new PrescriptionPage(page);

        await loginAsValidUser(page);
        await prescriptionPage.openList();
        await prescriptionPage.expectListViewLoaded();

        const hasData = await prescriptionPage.hasAnyListRecord();
        test.skip(!hasData, 'No prescription records available to update.');

        await prescriptionPage.openFirstListRecord();
        await prescriptionPage.expectCreateFormLoaded();

        const updatedDosage = `1-${Date.now().toString().slice(-2)}-1`;
        const updatedDuration = `${(Date.now() % 5) + 1} days`;
        const updatedLineNote = `Line note ${Date.now()}`;

        await prescriptionPage.fillForm({
            medicine: {
                dosage: updatedDosage,
                duration: updatedDuration,
                notes: updatedLineNote
            }
        });

        await prescriptionPage.save();

        await expect(prescriptionPage.getDosageInput()).toHaveValue(updatedDosage);
        await expect(prescriptionPage.getDurationInput()).toHaveValue(updatedDuration);
        await expect(prescriptionPage.getLineNotesInput()).toHaveValue(updatedLineNote);
    });
});
