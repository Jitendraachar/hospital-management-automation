import { expect, test } from '@playwright/test';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { loginAndOpenAppointments } from './appointmentsTestUtils';

test.describe('Appointments - Edit', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should open an existing draft appointment in form view', async ({ page }) => {
        const appointmentsPage = await loginAndOpenAppointments(page);

        await appointmentsPage.openFirstDraftRecord();

        await expect(appointmentsPage.getDoctorCombobox()).toBeVisible();
        await expect(appointmentsPage.getDateTextbox()).toBeVisible();
        await expect(appointmentsPage.getConsultationFeeTextbox()).toBeVisible();
        await expect(appointmentsPage.getCreateBillingButton()).toBeVisible();
        await expect(appointmentsPage.getStatusPill('Draft')).toBeVisible();
    });
});
