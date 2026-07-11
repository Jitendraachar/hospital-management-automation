import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { DoctorPage } from '../../pages/doctor';

test.describe('Doctor Module - Delete Doctor', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should delete a doctor from actions menu and remove it from list search', async ({ page }) => {
        const doctorPage = new DoctorPage(page);
        const uniqueSuffix = Date.now();
        const doctorName = `DeleteDoctor_${uniqueSuffix}`;

        await loginAsValidUser(page);
        await doctorPage.openList();
        await doctorPage.expectListViewLoaded();

        await doctorPage.createDoctor({
            name: doctorName,
            specialization: 'General Medicine',
            experienceYears: '7',
            phone: `9${String(uniqueSuffix).slice(-9)}`,
            email: `deletedoctor${uniqueSuffix}@mailinator.com`,
            address: 'Delete Flow Doctor Address'
        });

        await expect(doctorPage.getNameInput()).toHaveValue(doctorName);

        await doctorPage.deleteFromActionsMenu();

        await doctorPage.openList();
        await doctorPage.search(doctorName);

        await expect(doctorPage.getRowByText(doctorName)).toHaveCount(0);
    });
});
