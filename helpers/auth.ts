import { Page } from '@playwright/test';
import { LoginPage } from '../LoginPage';
import { getLoginCredentials } from './env';

export const loginAsValidUser = async (page: Page): Promise<void> => {
    const { username, password } = getLoginCredentials();
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(username, password);
};
