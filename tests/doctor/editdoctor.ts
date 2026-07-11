import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { DoctorPage } from '../../pages/doctor';

test.describe('Doctor Module - Edit Doctor', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should edit an existing doctor contact details and persist changes', async ({ page }) => {
        const doctorPage = new DoctorPage(page);
        const doctorName = 'doc1';
        const updatedPhone = `8${String(Date.now()).slice(-9)}`;

        await loginAsValidUser(page);
        await doctorPage.openList();
        await doctorPage.expectListViewLoaded();

        await doctorPage.search(doctorName);
        await expect(doctorPage.getRowByText(doctorName)).toBeVisible();

        await doctorPage.openDoctorByText(doctorName);
        await doctorPage.updatePhone(updatedPhone);
        await doctorPage.save();

        await expect(doctorPage.getPhoneInput()).toHaveValue(updatedPhone);

        await doctorPage.openList();
        await doctorPage.search(updatedPhone);

        await expect(doctorPage.getRowByText(updatedPhone)).toBeVisible();
    });
});
