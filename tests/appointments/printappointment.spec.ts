import { expect, test } from '@playwright/test';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { loginAndOpenAppointments } from './appointmentsTestUtils';

test.describe('Appointments - Print', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should show appointment receipt option in actions menu', async ({ page }) => {
        const appointmentsPage = await loginAndOpenAppointments(page);

        await appointmentsPage.openFirstDraftRecord();
        await appointmentsPage.openFormActionsMenu();
        await appointmentsPage.expectFormActionsMenuOptions();

        await expect(page.getByRole('menuitem', { name: /Appointment Receipt/i })).toBeVisible();
    });
});
