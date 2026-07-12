import { Page, TestInfo } from '@playwright/test';
import { detectAndReportDefects, getDefectTrackerState, initializeDefectTracking } from './defectDetectionEngine';

export const captureFailureScreenshot = async (page: Page, testInfo: TestInfo): Promise<void> => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const trackerState = initializeDefectTracking(page);
        await detectAndReportDefects(page, testInfo, getDefectTrackerState(page) ?? trackerState);

        try {
            await page.screenshot({
                path: `reports/screenshots/${testInfo.title.replace(/\s+/g, '_')}-failed.png`,
                fullPage: true,
                timeout: 5000
            });
        } catch {
            // Non-blocking: screenshot capture should not fail the hook.
        }
    }
};
