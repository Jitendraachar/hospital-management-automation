import { expect, test } from '@playwright/test';
import { LoginPage } from '../LoginPage';
import { getLoginCredentials } from '../helpers/env';
import { captureFailureScreenshot } from '../helpers/testHooks';

test.describe('Login Module', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        const { username, password } = getLoginCredentials();
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await expect(loginPage.getEmailInput()).toBeVisible();
        await expect(loginPage.getPasswordInput()).toBeVisible();
        await expect(loginPage.getLoginButton()).toBeVisible();

        await loginPage.login(username, password);

        await expect(page).toHaveURL(/\/odoo(\/|$|\/action-\d+)/);
        await expect(loginPage.getDashboardLink()).toBeVisible();
        await expect(loginPage.getHospitalOperationsHeading()).toBeVisible();
        await expect(loginPage.getModuleSearchInput()).toBeVisible();
        await expect(loginPage.getUserStatusButton()).toBeVisible();
    });
});
