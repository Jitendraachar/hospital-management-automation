import { expect, test } from '@playwright/test';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { loginAndOpenAppointments } from './appointmentsTestUtils';

test.describe('Appointments - Search', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should search appointment by appointment number', async ({ page }) => {
        const appointmentsPage = await loginAndOpenAppointments(page);

        await appointmentsPage.applyAppointmentNumberSearch('APT/0005');

        await expect(appointmentsPage.getSearchInput()).toHaveValue('APT/0005');
        await expect(appointmentsPage.getRowByText('APT/0005')).toBeVisible();
    });
});
