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

test.describe('Doctor Module - Search Doctor', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should search existing doctor by name', async ({ page }) => {
        const doctorPage = new DoctorPage(page);

        await loginAsValidUser(page);
        await doctorPage.openList();
        await doctorPage.expectListViewLoaded();

        await doctorPage.search('doc1');

        await expect(doctorPage.getRowByText('doc1')).toBeVisible();
    });

    test('should handle no-match doctor search safely', async ({ page }) => {
        const doctorPage = new DoctorPage(page);

        await loginAsValidUser(page);
        await doctorPage.openList();
        await doctorPage.expectListViewLoaded();

        await doctorPage.search('NO_MATCH_DOCTOR_001');

        await expect(doctorPage.getRowByText('NO_MATCH_DOCTOR_001')).toHaveCount(0);
    });

    test('should handle SQL-like payload in doctor search without breaking page', async ({ page }) => {
        const doctorPage = new DoctorPage(page);
        const payload = `' OR '1'='1`;

        await loginAsValidUser(page);
        await doctorPage.openList();
        await doctorPage.expectListViewLoaded();

        await doctorPage.search(payload);

        await expect(page).toHaveURL(/action-372\/action-375/);
    });
});
