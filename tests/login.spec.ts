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

        const loginFormVisible = await loginPage
            .getLoginButton()
            .isVisible()
            .catch(() => false);

        if (loginFormVisible) {
            await expect(loginPage.getEmailInput()).toBeVisible();
            await expect(loginPage.getPasswordInput()).toBeVisible();
            await expect(loginPage.getLoginButton()).toBeVisible();
            await loginPage.login(username, password);
        }

        await expect(loginPage.getModuleSearchInput()).toBeVisible();
    });
});
