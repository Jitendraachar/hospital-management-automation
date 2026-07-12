import { expect, test } from '@playwright/test';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { loginAndOpenAppointments } from './appointmentsTestUtils';

test.describe('Appointments - Filter', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should open search options and show filter entries', async ({ page }) => {
        const appointmentsPage = await loginAndOpenAppointments(page);

        await appointmentsPage.openSearchOptions();
        await appointmentsPage.expectSearchOptionsVisible();

        await expect(appointmentsPage.getRowByText('APT/0005')).toBeVisible();
    });

    test('should apply draft filter from search options', async ({ page }) => {
        const appointmentsPage = await loginAndOpenAppointments(page);

        await appointmentsPage.applyDraftFilter();

        await expect(appointmentsPage.getStatusPill('Draft')).toBeVisible();
    });
});
