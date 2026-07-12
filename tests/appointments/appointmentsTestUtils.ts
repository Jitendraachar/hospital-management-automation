import { Page, expect } from '@playwright/test';
import { getBaseUrl, getLoginCredentials } from '../../helpers/env';
import { AppointmentsPage } from '../../pages/Appointments/AppointmentsPage';

export const loginAndOpenAppointments = async (page: Page): Promise<AppointmentsPage> => {
    let username = 'team40';
    let password = 'vASPFtSh4d';

    try {
        const credentials = getLoginCredentials();
        username = credentials.username;
        password = credentials.password;
    } catch {
        // Fallback to default test credentials when env vars are not configured.
    }

    const baseUrl = getBaseUrl();
    const authUrl = new URL('/web/session/authenticate', baseUrl).toString();

    const authResponse = await page.request.post(authUrl, {
        data: {
            jsonrpc: '2.0',
            method: 'call',
            params: {
                db: 'team40',
                login: username,
                password
            },
            id: Date.now()
        }
    });

    expect(authResponse.ok()).toBeTruthy();

    const authBody = await authResponse.json();
    expect(authBody?.result?.uid).toBeTruthy();

    const appointmentsListUrl = new URL('/odoo/action-372/action-376', baseUrl).toString();
    await page.goto(appointmentsListUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const loginInput = page.locator('input[name="login"]').first();
    const passwordInput = page.locator('input[name="password"]').first();
    const loginButton = page.locator('button[type="submit"]').first();

    const redirectedToLogin =
        /\/web\/login/i.test(page.url()) ||
        (await loginInput.isVisible({ timeout: 3000 }).catch(() => false));

    if (redirectedToLogin) {
        await loginInput.fill(username);
        await passwordInput.fill(password);
        await loginButton.click();
        await page.goto(appointmentsListUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    }

    const newButton = page.getByRole('button', { name: 'New' }).first();
    const isListVisible = await newButton.isVisible({ timeout: 8000 }).catch(() => false);

    if (!isListVisible) {
        const dashboardUrl = new URL('/odoo/action-372', baseUrl).toString();
        await page.goto(dashboardUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

        const appointmentsLink = page.getByRole('link', { name: 'Appointments' }).first();
        const appointmentsButton = page.getByRole('button', { name: 'Appointments' }).first();

        if (await appointmentsLink.isVisible({ timeout: 5000 }).catch(() => false)) {
            await appointmentsLink.click();
        } else if (await appointmentsButton.isVisible({ timeout: 5000 }).catch(() => false)) {
            await appointmentsButton.click();
        } else {
            await page.goto(appointmentsListUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        }
    }

    await expect(page).toHaveURL(/\/odoo(\/|$|\/action-\d+)/);

    const appointmentsPage = new AppointmentsPage(page);
    await appointmentsPage.expectListViewLoaded();

    return appointmentsPage;
};
