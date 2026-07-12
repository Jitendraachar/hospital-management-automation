import { Page, Locator, expect } from '@playwright/test';
import { initializeDefectTracking, recordAdhocFinding } from './helpers/defectDetectionEngine';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
        initializeDefectTracking(page);
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async click(locator: Locator) {
        const isVisibleBeforeClick = await locator.isVisible();

        if (!isVisibleBeforeClick) {
            try {
                await locator.click({ force: true });
                recordAdhocFinding(this.page, {
                    issueType: 'Click action succeeds on invisible element',
                    summary: 'Control was invisible but click action succeeded',
                    description: 'Click was executed successfully on a non-visible element using force interaction.',
                    probableCause: 'Probable cause: CSS visibility issue or overlay mismatch allowing hidden interaction.',
                    severity: 'High',
                    priority: 'High'
                });
                return;
            } catch {
                recordAdhocFinding(this.page, {
                    issueType: 'Missing controls',
                    summary: 'Expected clickable control is not visible',
                    description: 'Attempted click on a control that remained non-visible and interaction failed.',
                    probableCause: 'Probable cause: Missing control render condition or hidden element state.'
                });
                throw new Error('Expected control is not visible and click action failed.');
            }
        }

        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    async fill(locator: Locator, value: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(value);
    }

    async getText(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible' });
        return (await locator.textContent()) ?? '';
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async verifyTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }

    async takeScreenshot(fileName: string) {
        await this.page.screenshot({
            path: `reports/screenshots/${fileName}.png`,
            fullPage: true
        });
    }
}
