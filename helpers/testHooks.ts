import { Page, TestInfo } from '@playwright/test';

export const captureFailureScreenshot = async (page: Page, testInfo: TestInfo): Promise<void> => {
    if (testInfo.status !== testInfo.expectedStatus) {
        await page.screenshot({
            path: `reports/screenshots/${testInfo.title.replace(/\s+/g, '_')}-failed.png`,
            fullPage: true
        });
    }
};
