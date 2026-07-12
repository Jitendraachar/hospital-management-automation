import { expect, Page } from '@playwright/test';
import { LoginPage } from '../LoginPage';
import { getLoginCredentials } from './env';

const FALLBACK_USERNAME = 'team40';
const FALLBACK_PASSWORD = 'vASPFtSh4d';

export const loginAsValidUser = async (page: Page): Promise<void> => {
    const loginPage = new LoginPage(page);

    let username = FALLBACK_USERNAME;
    let password = FALLBACK_PASSWORD;

    try {
        const credentials = getLoginCredentials();
        username = credentials.username;
        password = credentials.password;
    } catch {
        // Use fallback credentials for shared billing automation when env vars are unavailable.
    }

    await loginPage.open();
    await loginPage.login(username, password);
    await expect(loginPage.getHospitalOperationsHeading()).toBeVisible({ timeout: 15000 });
};
