import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Page, TestInfo } from '@playwright/test';

type DefectSeverity = 'High' | 'Medium' | 'Low';
type DefectPriority = 'High' | 'Medium' | 'Low';

export interface TrackerConsoleEntry {
    type: string;
    text: string;
    timestamp: string;
}

export interface TrackerNetworkEntry {
    url: string;
    status: number;
    method: string;
    statusText: string;
    resourceType: string;
    timestamp: string;
}

export interface TrackerRequestFailure {
    url: string;
    method: string;
    resourceType: string;
    errorText: string;
    timestamp: string;
}

export interface TrackerPopupEntry {
    type: string;
    message: string;
    defaultValue: string;
    timestamp: string;
}

export interface DefectTrackerState {
    consoleErrors: TrackerConsoleEntry[];
    networkErrors: TrackerNetworkEntry[];
    requestFailures: TrackerRequestFailure[];
    popups: TrackerPopupEntry[];
    adhocFindings: RawFinding[];
}

interface RawFinding {
    issueType: string;
    summary: string;
    description: string;
    probableCause: string;
    severity?: DefectSeverity;
    priority?: DefectPriority;
}

interface DefectRecord {
    defectId: string;
    module: string;
    page: string;
    testName: string;
    severity: DefectSeverity;
    priority: DefectPriority;
    issueType: string;
    summary: string;
    description: string;
    stepsToReproduce: string;
    expectedResult: string;
    actualResult: string;
    screenshotPath: string;
    browser: string;
    executionTime: string;
    buildNumber: string;
    status: 'New';
    currentUrl: string;
    timestamp: string;
    consoleErrors: string;
    networkErrors: string;
}

const EXCEL_DIR = path.join(process.cwd(), 'excel');
const trackerRegistry = new WeakMap<Page, DefectTrackerState>();
const trackerAttached = new WeakSet<Page>();
const SCREENSHOT_DIR = path.join(process.cwd(), 'test-results', 'screenshots');

const BUG_REPORT_HEADERS = [
    'Bug ID',
    'Title',
    'Module',
    'Severity',
    'Priority',
    'Environment',
    'URL',
    'Reported By',
    'Reported Date',
    'Status',
    'Preconditions',
    'Steps to Reproduce',
    'Expected Result',
    'Actual Result',
    'Evidence'
];

const DEFAULT_SEVERITY: DefectSeverity = 'Medium';
const DEFAULT_PRIORITY: DefectPriority = 'Medium';

function sanitizeName(value: string): string {
    return value.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 80) || 'Unknown';
}

function csvEscape(value: string): string {
    const text = value.replace(/"/g, '""');
    return `"${text}"`;
}

function toCsvLine(values: string[]): string {
    return `${values.map(csvEscape).join(',')}\n`;
}

function inferModuleName(testInfo: TestInfo): string {
    const pathTokens = testInfo.titlePath;
    const moduleToken = pathTokens.find((token: string) => /module/i.test(token));
    if (moduleToken) {
        return moduleToken.replace(/\s*module\s*/i, '').trim() || 'General';
    }

    const fileName = path.basename(testInfo.file);
    const firstToken = fileName.split('.')[0];
    return firstToken.replace(/[-_]/g, ' ').trim() || 'General';
}

function inferPageFromUrl(url: string): string {
    try {
        const parsed = new URL(url);
        return parsed.pathname || '/';
    } catch {
        return url || 'N/A';
    }
}

function mapSeverity(issueType: string): DefectSeverity {
    if (
        /hidden but clickable|click action succeeds on invisible element|save button missing|navigation failure|validation failure/i.test(
            issueType
        )
    ) {
        return 'High';
    }

    if (/unexpected popup|console error|network error|missing control|disabled control/i.test(issueType)) {
        return 'Medium';
    }

    return DEFAULT_SEVERITY;
}

function mapPriority(severity: DefectSeverity): DefectPriority {
    if (severity === 'High') {
        return 'High';
    }

    if (severity === 'Medium') {
        return 'Medium';
    }

    return 'Low';
}

function createDefectId(moduleName: string, index: number): string {
    const moduleCode = sanitizeName(moduleName).slice(0, 4).toUpperCase() || 'GEN';
    const timestampPart = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(2, 17);
    return `BUG-${moduleCode}-${timestampPart}-${String(index).padStart(3, '0')}`;
}

async function ensureReportArtifacts(): Promise<void> {
    await fs.mkdir(EXCEL_DIR, { recursive: true });
    await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
}

function resolveBugReportFile(moduleName: string): string {
    const moduleSegment = sanitizeName(moduleName).toLowerCase();
    return path.join(EXCEL_DIR, `bug_report_${moduleSegment}.csv`);
}

async function ensureBugReportFile(reportFile: string): Promise<void> {
    try {
        await fs.access(reportFile);
    } catch {
        await fs.writeFile(reportFile, `${BUG_REPORT_HEADERS.join(',')}\n`, 'utf-8');
    }
}

async function captureIssueScreenshot(
    page: Page,
    moduleName: string,
    testName: string,
    timestamp: string,
    index: number
): Promise<string> {
    const baseName = `${sanitizeName(moduleName)}_${sanitizeName(testName)}_${timestamp}`;
    const fileName = index === 0 ? `${baseName}.png` : `${baseName}_${index + 1}.png`;
    const filePath = path.join(SCREENSHOT_DIR, fileName);

    if (page.isClosed()) {
        return 'N/A';
    }

    try {
        await page.screenshot({
            path: filePath,
            fullPage: true,
            timeout: 5000
        });
        return path.relative(process.cwd(), filePath).replaceAll('\\', '/');
    } catch {
        return 'N/A';
    }
}

async function evaluateDomFindings(page: Page): Promise<RawFinding[]> {
    if (page.isClosed()) {
        return [];
    }

    return page.evaluate(() => {
        const findings: RawFinding[] = [];
        const doc = (globalThis as any).document;
        const win = (globalThis as any).window;

        if (!doc || !win) {
            return findings;
        }

        const buttonSelector = 'button, [role="button"], input[type="button"], input[type="submit"], input[type="reset"]';
        const buttons = Array.from(doc.querySelectorAll(buttonSelector));

        const isElementHidden = (element: any): boolean => {
            const style = win.getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return (
                style.display === 'none' ||
                style.visibility === 'hidden' ||
                style.opacity === '0' ||
                rect.width === 0 ||
                rect.height === 0
            );
        };

        const isClickableCandidate = (element: any): boolean => {
            const style = win.getComputedStyle(element);
            return style.pointerEvents !== 'none' && !element.hasAttribute('disabled');
        };

        const hiddenButtons = buttons.filter((button) => isElementHidden(button));
        if (hiddenButtons.length > 0) {
            findings.push({
                issueType: 'Hidden buttons',
                summary: `${hiddenButtons.length} button(s) are hidden on current page`,
                description: 'Detected button-like controls with hidden visibility or zero-size rendering.',
                probableCause: 'Probable cause: CSS visibility issue (display:none / visibility:hidden / zero-sized element).'
            });
        }

        const hiddenClickable = buttons.filter((button) => isElementHidden(button) && isClickableCandidate(button));
        if (hiddenClickable.length > 0) {
            findings.push({
                issueType: 'Click action succeeds on invisible element',
                summary: `${hiddenClickable.length} invisible button(s) are still programmatically clickable`,
                description: 'Invisible controls are not disabled and still expose interactive behaviour.',
                probableCause: 'Probable cause: Incorrect z-index/opacity handling with active click handlers.',
                severity: 'High',
                priority: 'High'
            });
        }

        const disabledControls = buttons.filter((button: any) => button.hasAttribute('disabled'));
        const disabledInteractive = disabledControls.filter((button: any) => {
            const hasOnClick = typeof button.onclick === 'function';
            return hasOnClick || button.dataset?.testid !== undefined;
        });

        if (disabledInteractive.length > 0) {
            findings.push({
                issueType: 'Disabled controls behaving as enabled',
                summary: `${disabledInteractive.length} disabled control(s) still expose click handlers`,
                description: 'Detected disabled controls carrying interaction wiring.',
                probableCause: 'Probable cause: Disabled-state logic issue in UI event binding.'
            });
        }

        const saveButton = buttons.find((button: any) => /save/i.test(button.innerText || button.getAttribute('value') || ''));
        if (!saveButton) {
            findings.push({
                issueType: 'Save button missing',
                summary: 'Save button is not present on current interactive page',
                description: 'No visible Save action was found among button controls.',
                probableCause: 'Probable cause: Missing control render condition or routing state mismatch.',
                severity: 'High',
                priority: 'High'
            });
        }

        const formControls = Array.from(doc.querySelectorAll('input, select, textarea'));
        const missingLabels = formControls.filter((control: any) => {
            const id = control.getAttribute('id');
            const hasAriaLabel = !!control.getAttribute('aria-label');
            const hasLabel = id ? !!doc.querySelector(`label[for="${id}"]`) : false;
            return !hasAriaLabel && !hasLabel;
        });

        if (missingLabels.length > 0) {
            findings.push({
                issueType: 'Missing labels',
                summary: `${missingLabels.length} form control(s) are missing associated labels`,
                description: 'Found form controls without accessible labels.',
                probableCause: 'Probable cause: Label binding omitted in component markup.'
            });
        }

        const requiredEmpty = formControls.filter((control: any) => control.hasAttribute('required') && !control.value);
        if (requiredEmpty.length > 0) {
            findings.push({
                issueType: 'Empty mandatory fields without validation',
                summary: `${requiredEmpty.length} required field(s) are empty`,
                description: 'Required controls are empty and validation feedback may be missing.',
                probableCause: 'Probable cause: Validation logic issue for required form fields.',
                severity: 'High',
                priority: 'High'
            });
        }

        let overlapCount = 0;
        for (const button of buttons.filter((candidate) => !isElementHidden(candidate))) {
            const rect = (button as any).getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const topElement = doc.elementFromPoint(x, y);
            if (topElement && topElement !== button && !(button as any).contains(topElement)) {
                overlapCount += 1;
            }
        }

        if (overlapCount > 0) {
            findings.push({
                issueType: 'Overlapping controls',
                summary: `${overlapCount} control(s) appear overlapped by another element`,
                description: 'Clickable control center point is blocked by a different element.',
                probableCause: 'Probable cause: Incorrect z-index / overlay layer issue.'
            });
        }

        const brokenImages = Array.from(doc.querySelectorAll('img')).filter(
            (img: any) => !img.complete || img.naturalWidth === 0
        );
        if (brokenImages.length > 0) {
            findings.push({
                issueType: 'Broken icons',
                summary: `${brokenImages.length} image/icon resource(s) failed to render`,
                description: 'Image-based icons appear broken or unloaded.',
                probableCause: 'Probable cause: Broken asset URL or failed icon network response.'
            });
        }

        const possibleMisalignedRows = Array.from(doc.querySelectorAll('form, [role="form"]')).flatMap((form: any) =>
            Array.from(form.querySelectorAll('label, input, select, textarea'))
        );

        if (possibleMisalignedRows.length > 3) {
            const tops = possibleMisalignedRows.map((element: any) => Math.round(element.getBoundingClientRect().top));
            const uniqueTopCount = new Set(tops).size;
            if (uniqueTopCount > possibleMisalignedRows.length * 0.8) {
                findings.push({
                    issueType: 'Misaligned controls',
                    summary: 'Control alignment is inconsistent across current form layout',
                    description: 'Detected highly fragmented vertical alignment for form controls.',
                    probableCause: 'Probable cause: CSS layout alignment issue (grid/flex constraints mismatch).'
                });
            }
        }

        return findings;
    });
}

function buildRecords(
    findings: RawFinding[],
    metadata: {
        moduleName: string;
        testName: string;
        browserName: string;
        pageUrl: string;
        timestamp: string;
        executionTime: string;
        buildNumber: string;
        consoleErrors: string;
        networkErrors: string;
    },
    screenshotPaths: string[]
): DefectRecord[] {
    return findings.map((finding, index) => {
        const severity = finding.severity ?? mapSeverity(finding.issueType);
        const priority = finding.priority ?? mapPriority(severity);
        return {
            defectId: createDefectId(metadata.moduleName, index + 1),
            module: metadata.moduleName,
            page: inferPageFromUrl(metadata.pageUrl),
            testName: metadata.testName,
            severity,
            priority,
            issueType: finding.issueType,
            summary: finding.summary,
            description: `${finding.description} ${finding.probableCause}`.trim(),
            stepsToReproduce: `Execute test "${metadata.testName}" and observe module "${metadata.moduleName}" on page "${metadata.pageUrl}".`,
            expectedResult: 'UI and functional behaviour should remain valid, visible, and actionable as per specification.',
            actualResult: finding.summary,
            screenshotPath: screenshotPaths[index] ?? 'N/A',
            browser: metadata.browserName,
            executionTime: metadata.executionTime,
            buildNumber: metadata.buildNumber,
            status: 'New',
            currentUrl: metadata.pageUrl || 'N/A',
            timestamp: metadata.timestamp,
            consoleErrors: metadata.consoleErrors,
            networkErrors: metadata.networkErrors
        };
    });
}

async function appendDefectRows(records: DefectRecord[], moduleName: string): Promise<void> {
    if (records.length === 0) {
        return;
    }

    const reportFile = resolveBugReportFile(moduleName);
    await ensureBugReportFile(reportFile);

    const environment = process.env.TEST_ENVIRONMENT?.trim() || 'QA Automation';
    const reportedBy = process.env.REPORTED_BY?.trim() || 'QA Automation Engineer';

    const rows = records.map((record) =>
        toCsvLine([
            record.defectId,
            `${record.issueType}: ${record.summary}`,
            record.module,
            record.severity,
            record.priority,
            environment,
            record.currentUrl,
            reportedBy,
            record.timestamp.slice(0, 10),
            'Open',
            `Test "${record.testName}" executed on browser "${record.browser}"`,
            record.stepsToReproduce,
            record.expectedResult,
            record.actualResult,
            `Screenshot: ${record.screenshotPath}; Console: ${record.consoleErrors}; Network: ${record.networkErrors}`
        ])
    );

    await fs.appendFile(reportFile, rows.join(''), 'utf-8');
}

function createEmptyTrackerState(): DefectTrackerState {
    return {
        consoleErrors: [],
        networkErrors: [],
        requestFailures: [],
        popups: [],
        adhocFindings: []
    };
}

function nowIsoTimestamp(): string {
    return new Date().toISOString();
}

export function getDefectTrackerState(page: Page): DefectTrackerState {
    const existingState = trackerRegistry.get(page);
    if (existingState) {
        return existingState;
    }

    const newState = createEmptyTrackerState();
    trackerRegistry.set(page, newState);
    return newState;
}

export function recordAdhocFinding(page: Page, finding: RawFinding): void {
    const state = getDefectTrackerState(page);
    state.adhocFindings.push(finding);
}

export function initializeDefectTracking(page: Page): DefectTrackerState {
    const state = getDefectTrackerState(page);
    if (trackerAttached.has(page)) {
        return state;
    }

    trackerAttached.add(page);

    page.on('console', (message) => {
        if (message.type() === 'error') {
            state.consoleErrors.push({
                type: message.type(),
                text: message.text(),
                timestamp: nowIsoTimestamp()
            });
        }
    });

    page.on('response', (response) => {
        if (response.status() >= 400) {
            const request = response.request();
            state.networkErrors.push({
                url: response.url(),
                status: response.status(),
                method: request.method(),
                statusText: response.statusText(),
                resourceType: request.resourceType(),
                timestamp: nowIsoTimestamp()
            });
        }
    });

    page.on('requestfailed', (request) => {
        state.requestFailures.push({
            url: request.url(),
            method: request.method(),
            resourceType: request.resourceType(),
            errorText: request.failure()?.errorText ?? 'Unknown request failure',
            timestamp: nowIsoTimestamp()
        });
    });

    page.on('dialog', async (dialog) => {
        state.popups.push({
            type: dialog.type(),
            message: dialog.message(),
            defaultValue: dialog.defaultValue(),
            timestamp: nowIsoTimestamp()
        });

        await dialog.dismiss();
    });

    page.on('popup', (popup) => {
        state.popups.push({
            type: 'window',
            message: `Popup window opened: ${popup.url() || 'about:blank'}`,
            defaultValue: '',
            timestamp: nowIsoTimestamp()
        });
    });

    return state;
}

function deduplicateFindings(findings: RawFinding[]): RawFinding[] {
    const seen = new Set<string>();
    const result: RawFinding[] = [];

    for (const finding of findings) {
        const key = `${finding.issueType}::${finding.summary}`;
        if (!seen.has(key)) {
            seen.add(key);
            result.push(finding);
        }
    }

    return result;
}

export async function detectAndReportDefects(
    page: Page,
    testInfo: TestInfo,
    trackerState: DefectTrackerState
): Promise<void> {
    await ensureReportArtifacts();

    const moduleName = inferModuleName(testInfo);
    const testName = testInfo.title;
    const browserName = testInfo.project.name || 'Unknown';
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    const executionTime = now.toISOString();
    const buildNumber = process.env.BUILD_NUMBER ?? 'N/A';
    const pageUrl = page.isClosed() ? (testInfo.attachments.find((attachment) => attachment.name === 'url')?.body?.toString() ?? 'N/A') : page.url();

    const findings: RawFinding[] = [];
    findings.push(...(await evaluateDomFindings(page)));
    findings.push(...trackerState.adhocFindings);

    if (trackerState.popups.length > 0) {
        findings.push({
            issueType: 'Unexpected popups',
            summary: `${trackerState.popups.length} unexpected dialog popup(s) detected`,
            description: 'Dialog/pop-up interruption captured during test execution.',
            probableCause: 'Probable cause: Unexpected popup trigger due to workflow guard or unhandled dialog state.'
        });
    }

    if (trackerState.consoleErrors.length > 0) {
        findings.push({
            issueType: 'Unexpected page behaviour',
            summary: `${trackerState.consoleErrors.length} console error(s) detected`,
            description: 'Runtime console errors were emitted while test was executing.',
            probableCause: 'Probable cause: Frontend runtime exception or unhandled promise rejection.'
        });
    }

    const networkIssueCount = trackerState.networkErrors.length + trackerState.requestFailures.length;
    if (networkIssueCount > 0) {
        findings.push({
            issueType: 'Navigation failures',
            summary: `${networkIssueCount} network/navigation error(s) detected`,
            description: 'HTTP failures or request failures detected during flow navigation.',
            probableCause: 'Probable cause: API/network failure or route handling issue.',
            severity: 'High',
            priority: 'High'
        });
    }

    const uniqueFindings = deduplicateFindings(findings);
    if (uniqueFindings.length === 0) {
        return;
    }

    const screenshotPaths: string[] = [];
    for (let index = 0; index < uniqueFindings.length; index += 1) {
        screenshotPaths.push(await captureIssueScreenshot(page, moduleName, testName, timestamp, index));
    }

    const consoleSummary = trackerState.consoleErrors.map((entry) => `${entry.timestamp} [${entry.type}] ${entry.text}`).join(' | ') || 'N/A';
    const networkSummary =
        [
            ...trackerState.networkErrors.map(
                (entry) =>
                    `${entry.timestamp} [${entry.status}] ${entry.method} ${entry.resourceType} ${entry.url} (${entry.statusText})`
            ),
            ...trackerState.requestFailures.map(
                (entry) =>
                    `${entry.timestamp} [FAILED] ${entry.method} ${entry.resourceType} ${entry.url} (${entry.errorText})`
            )
        ].join(' | ') || 'N/A';

    const records = buildRecords(
        uniqueFindings,
        {
            moduleName,
            testName,
            browserName,
            pageUrl,
            timestamp: now.toISOString(),
            executionTime,
            buildNumber,
            consoleErrors: consoleSummary,
            networkErrors: networkSummary
        },
        screenshotPaths
    );

    await appendDefectRows(records, moduleName);
}
