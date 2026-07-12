import { expect, test } from '@playwright/test';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { loginAndOpenAppointments } from './appointmentsTestUtils';

test.describe('Appointments - Update', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should update consultation fee and notes for a draft appointment', async ({ page }) => {
        const appointmentsPage = await loginAndOpenAppointments(page);

        await appointmentsPage.openFirstDraftRecord();
        await appointmentsPage.fillForm({
            consultationFee: '45.50',
            notes: 'Automation update check'
        });
        await appointmentsPage.save();

        await expect(appointmentsPage.getConsultationFeeTextbox()).toHaveValue('45.50');
        await expect(appointmentsPage.getNotesTextbox()).toHaveValue('Automation update check');
    });
});
