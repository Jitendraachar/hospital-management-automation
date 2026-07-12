import { expect, test } from '@playwright/test';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { loginAndOpenAppointments } from './appointmentsTestUtils';

test.describe('Appointments - Create', () => {
    test.describe.configure({ timeout: 90000 });
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should open new appointment form with required controls', async ({ page }) => {
        const appointmentsPage = await loginAndOpenAppointments(page);

        await appointmentsPage.clickNew();
        await appointmentsPage.expectCreateFormLoaded();

        await expect(appointmentsPage.getDoctorCombobox()).toBeVisible();
        await expect(appointmentsPage.getDateTextbox()).toBeVisible();
        await expect(appointmentsPage.getConsultationFeeTextbox()).toBeVisible();
        await expect(appointmentsPage.getSaveButton()).toBeVisible();
        await expect(appointmentsPage.getPrintReceiptButton()).toBeVisible();
    });

    test('should show validation when saving appointment without required fields', async ({ page }) => {
        const appointmentsPage = await loginAndOpenAppointments(page);

        await appointmentsPage.clickNew();
        await appointmentsPage.save();
        await appointmentsPage.expectMissingRequiredFieldValidation();

        await expect(appointmentsPage.getDoctorCombobox()).toBeVisible();
        await expect(appointmentsPage.getDateTextbox()).toBeVisible();
    });
});
