import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { PrescriptionPage } from '../../pages/Prescription/PrescriptionPage';

test.describe('Prescription Module - Edit Prescription', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should edit opened prescription notes and keep changes after save', async ({ page }) => {
        const prescriptionPage = new PrescriptionPage(page);

        await loginAsValidUser(page);
        await prescriptionPage.openList();
        await prescriptionPage.expectListViewLoaded();

        const hasData = await prescriptionPage.hasAnyListRecord();
        test.skip(!hasData, 'No prescription records available to edit.');

        await prescriptionPage.openFirstListRecord();
        await prescriptionPage.expectCreateFormLoaded();

        const updatedNote = `Updated by automation at ${new Date().toISOString()}`;

        await prescriptionPage.fillForm({
            notes: updatedNote
        });
        await prescriptionPage.save();

        await expect(prescriptionPage.getPrescriptionNotesInput()).toHaveValue(updatedNote);
    });
});
