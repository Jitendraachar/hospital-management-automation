import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { getBaseUrl } from './helpers/env';

export class LoginPage extends BasePage {
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly dashboardLink: Locator;
    private readonly hospitalOperationsHeading: Locator;
    private readonly moduleSearchInput: Locator;
    private readonly userStatusButton: Locator;

    constructor(page: Page) {
        super(page);

        const loginForm = page.locator('main form').first();

        this.emailInput = loginForm.getByPlaceholder('Enter your email');
        this.passwordInput = loginForm.getByPlaceholder('Enter your password');
        this.loginButton = loginForm.getByRole('button', { name: /Log in/i });

        this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
        this.hospitalOperationsHeading = page.getByRole('heading', { name: 'Hospital Operations' });
        this.moduleSearchInput = page.getByRole('textbox', { name: 'Search modules, features, tools...' });
        this.userStatusButton = page.getByRole('button', { name: /User/i });
    }

    async open(): Promise<void> {
        const loginUrl = new URL('/odoo', getBaseUrl()).toString();
        await this.navigate(loginUrl);

        const loginVisible = await this.loginButton
            .waitFor({ state: 'visible', timeout: 10000 })
            .then(() => true)
            .catch(() => false);

        if (!loginVisible) {
            const authenticatedVisible = await this.moduleSearchInput
                .waitFor({ state: 'visible', timeout: 10000 })
                .then(() => true)
                .catch(() => false);

            if (!authenticatedVisible) {
                await this.page.waitForLoadState('domcontentloaded');
            }
        }
    }

    async enterEmail(email: string): Promise<void> {
        await this.fill(this.emailInput, email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.fill(this.passwordInput, password);
    }

    async submit(): Promise<void> {
        await this.click(this.loginButton);
    }

    async login(email: string, password: string): Promise<void> {
        const isLoginVisible = await this.loginButton.isVisible().catch(() => false);
        if (!isLoginVisible) {
            return;
        }

        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.submit();
    }

    getEmailInput(): Locator {
        return this.emailInput;
    }

    getPasswordInput(): Locator {
        return this.passwordInput;
    }

    getLoginButton(): Locator {
        return this.loginButton;
    }

    getDashboardLink(): Locator {
        return this.dashboardLink;
    }

    getHospitalOperationsHeading(): Locator {
        return this.hospitalOperationsHeading;
    }

    getModuleSearchInput(): Locator {
        return this.moduleSearchInput;
    }

    getUserStatusButton(): Locator {
        return this.userStatusButton;
    }
}
