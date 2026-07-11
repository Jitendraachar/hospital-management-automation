import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../../helpers/auth';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { DoctorPage } from '../../pages/doctor';

test.describe('Doctor Module - Add Doctor', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should create a new doctor and show it in doctor search results', async ({ page }) => {
        const doctorPage = new DoctorPage(page);
        const uniqueSuffix = Date.now();
        const doctorName = `AutoDoctor_${uniqueSuffix}`;

        await loginAsValidUser(page);
        await doctorPage.openList();
        await doctorPage.expectListViewLoaded();

        await doctorPage.createDoctor({
            name: doctorName,
            specialization: 'Cardiology',
            experienceYears: '12',
            phone: `9${String(uniqueSuffix).slice(-9)}`,
            email: `autodoctor${uniqueSuffix}@mailinator.com`,
            address: 'Automation Doctor Address'
        });

        await expect(doctorPage.getNameInput()).toHaveValue(doctorName);

        await doctorPage.openList();
        await doctorPage.search(doctorName);

        await expect(doctorPage.getRowByText(doctorName)).toBeVisible();
    });
});
