import { expect, test } from '@playwright/test';
import { getLoginCredentials } from '../../helpers/env';
import { captureFailureScreenshot } from '../../helpers/testHooks';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';

test.describe('Dashboard Module', () => {
    const ensureDashboardSession = async (page: import('@playwright/test').Page): Promise<void> => {
        await page.goto('https://team40.qaaerp.com/odoo/action-372');

        if (page.url().includes('/web/login')) {
            const { username, password } = getLoginCredentials();

            const loginInput = page.locator('input[name="login"]').first();
            const passwordInput = page.locator('input[name="password"]').first();

            await loginInput.waitFor({ state: 'attached' });
            await passwordInput.waitFor({ state: 'attached' });

            const submitted = await page.evaluate(
                ({ user, pass }) => {
                    const doc = (globalThis as any).document;
                    const login = doc?.querySelector('input[name="login"]');
                    const password = doc?.querySelector('input[name="password"]');

                    if (!login || !password) {
                        return false;
                    }

                    login.value = user;
                    login.dispatchEvent(new Event('input', { bubbles: true }));
                    login.dispatchEvent(new Event('change', { bubbles: true }));

                    password.value = pass;
                    password.dispatchEvent(new Event('input', { bubbles: true }));
                    password.dispatchEvent(new Event('change', { bubbles: true }));

                    const form = login.closest('form');
                    if (form) {
                        if (typeof form.requestSubmit === 'function') {
                            form.requestSubmit();
                        } else {
                            form.submit();
                        }

                        return true;
                    }

                    const submitButton = doc?.querySelector('button[type="submit"]');
                    if (submitButton) {
                        submitButton.click();
                        return true;
                    }

                    return false;
                },
                { user: username, pass: password }
            );

            if (!submitted) {
                throw new Error('Dashboard login form controls were not available for authentication.');
            }
        }

        await expect
            .poll(() => page.url(), { timeout: 20000 })
            .not.toContain('/web/login');

        if (page.url().includes('/web/login')) {
            throw new Error('Authentication did not complete successfully for Dashboard tests.');
        }
    };

    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should load dashboard KPIs and quick access section', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        await ensureDashboardSession(page);
        await dashboardPage.open();
        await dashboardPage.expectDashboardLoaded();

        await expect(dashboardPage.getKpiLabel('Total Patients')).toBeVisible();
        await expect(dashboardPage.getKpiLabel('OPD Appointments')).toBeVisible();
        await expect(dashboardPage.getKpiLabel('Pending Lab Tests')).toBeVisible();
        await expect(dashboardPage.getKpiLabel('Paid Revenue')).toBeVisible();
        await expect(dashboardPage.getKpiLabel('Active Doctors')).toBeVisible();
    });

    test('should keep dashboard stable when module search receives special payload', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const payload = `' OR '1'='1`;

        await ensureDashboardSession(page);
        await dashboardPage.open();
        await dashboardPage.expectDashboardLoaded();

        await dashboardPage.searchModule(payload);

        await expect(dashboardPage.getModuleSearchInput()).toHaveValue(payload);
        await expect(page).toHaveURL(/\/odoo\/action-372(?:$|\/?)/);
        await expect(dashboardPage.getQuickAccessHeading()).toBeVisible();
    });

    test('should navigate to core modules from top navigation links', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        await ensureDashboardSession(page);

        const topNavExpectations: Array<{ module: 'Patients' | 'Doctors' | 'Prescriptions' | 'Appointments' | 'Billings'; url: RegExp }> = [
            { module: 'Patients', url: /action-372\/action-374/ },
            { module: 'Doctors', url: /action-372\/action-375/ },
            { module: 'Prescriptions', url: /action-372\/action-377/ },
            { module: 'Appointments', url: /action-372\/action-376/ },
            { module: 'Billings', url: /\/odoo\/action-383/ }
        ];

        for (const item of topNavExpectations) {
            await dashboardPage.open();
            await dashboardPage.expectDashboardLoaded();

            await dashboardPage.clickTopNav(item.module);

            await expect(page).toHaveURL(item.url);
            await expect(page.getByRole('searchbox', { name: 'Search...' })).toBeVisible();
        }
    });

    test('should navigate to core modules from quick access cards', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        await ensureDashboardSession(page);

        const quickAccessExpectations: Array<{
            module: 'Patients' | 'Doctors' | 'Prescriptions' | 'Appointments' | 'Billing';
            url: RegExp;
        }> = [
            { module: 'Patients', url: /action-372\/action-374/ },
            { module: 'Doctors', url: /action-372\/action-375/ },
            { module: 'Prescriptions', url: /action-372\/action-377/ },
            { module: 'Appointments', url: /action-372\/action-376/ },
            { module: 'Billing', url: /\/odoo\/action-383/ }
        ];

        for (const item of quickAccessExpectations) {
            await dashboardPage.open();
            await dashboardPage.expectDashboardLoaded();

            await dashboardPage.clickQuickAccess(item.module);

            await expect(page).toHaveURL(item.url);
            await expect(page.getByRole('searchbox', { name: 'Search...' })).toBeVisible();
        }
    });
});
