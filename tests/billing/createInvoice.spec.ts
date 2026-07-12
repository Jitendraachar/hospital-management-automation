import { expect, test, type Page, type TestInfo } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loginAndOpenBilling } from './billingTestSetup';

type ValidationFailure = {
  step: string;
  expected: string;
  actual: string;
  stack?: string;
};

const BUG_REPORT_PATH = 'docs/bug-reports/billing-e2e-auto-bug-report.md';

const safeStep = async (
  failures: ValidationFailure[],
  step: string,
  expected: string,
  action: () => Promise<void>,
  continueOnError = true
): Promise<void> => {
  try {
    await action();
  } catch (error) {
    const typed = error as Error;
    failures.push({
      step,
      expected,
      actual: typed.message,
      stack: typed.stack
    });

    if (!continueOnError) {
      throw error;
    }
  }
};

const writeBugReport = async (params: {
  testInfo: TestInfo;
  failures: ValidationFailure[];
  createdBillId: string;
  testData: Record<string, string>;
  consoleErrors: string[];
  jsExceptions: string[];
  failedRequests: Array<{ url: string; status: number; method: string }>;
  evidence: {
    failureScreenshot: string;
    fullPageScreenshot: string;
    domSnapshot: string;
    consoleLogPath: string;
    networkLogPath: string;
  };
  durationMs: number;
  buildVersion: string;
  browserVersion: string;
}): Promise<void> => {
  const {
    failures,
    createdBillId,
    testData,
    consoleErrors,
    jsExceptions,
    failedRequests,
    evidence,
    durationMs,
    buildVersion,
    browserVersion
  } = params;

  await mkdir('docs/bug-reports', { recursive: true });

  const firstFailure = failures[0];
  const now = new Date().toISOString();

  const markdown = `# Bug Report - Billing E2E CRUD Flow Failure

## Bug Title
Billing end-to-end CRUD flow validation failure: ${firstFailure?.step ?? 'Unknown Step'}

## Module
Billing

## Feature
Create → Edit → Delete Bill

## Environment
- URL: https://team40.qaaerp.com/odoo
- OS: ${process.platform}
- Browser: Chromium ${browserVersion}
- Build Version: ${buildVersion}
- Timestamp: ${now}

## Severity
High

## Priority
High

## Preconditions
1. Valid login credentials available.
2. Billing module is accessible.
3. Patient \`Pat shalz\` exists.

## Test Data
- Created Bill ID: ${createdBillId || 'Not created'}
- Data: ${JSON.stringify(testData, null, 2)}

## Steps to Reproduce
1. Login.
2. Navigate to Billing.
3. Create new bill with mandatory/editable values.
4. Validate saved values.
5. Edit bill and validate persisted values.
6. Delete bill and confirm absence.

## Expected Result
Billing CRUD flow should complete successfully with all validations passing and data retained correctly.

## Actual Result
One or more validations failed during execution.

## Reproducibility
Intermittent/Consistent based on attached automation run. Current run failed.

## Failed Step Details
${failures
  .map(
    (f, i) => `### Failure ${i + 1}
- Step: ${f.step}
- Expected: ${f.expected}
- Actual: ${f.actual}
- Stack: \`\`\`
${f.stack ?? 'N/A'}
\`\`\``
  )
  .join('\n\n')}

## Console Errors
\`\`\`json
${JSON.stringify(consoleErrors, null, 2)}
\`\`\`

## JavaScript Exceptions
\`\`\`json
${JSON.stringify(jsExceptions, null, 2)}
\`\`\`

## API / Network Failures
\`\`\`json
${JSON.stringify(failedRequests, null, 2)}
\`\`\`

## Evidence
- Failure Screenshot: \`${evidence.failureScreenshot}\`
- Full-page Screenshot: \`${evidence.fullPageScreenshot}\`
- DOM Snapshot: \`${evidence.domSnapshot}\`
- Console Logs: \`${evidence.consoleLogPath}\`
- Network Logs: \`${evidence.networkLogPath}\`
- Video: Playwright retained-on-failure artifact in \`test-results/\`
- Trace: Playwright retained-on-failure artifact in \`test-results/\`

## Execution Metadata
- Duration: ${durationMs} ms
- Failed HTTP count: ${failedRequests.length}
- Console error count: ${consoleErrors.length}
- JS exception count: ${jsExceptions.length}

## Root Cause Analysis (Initial)
Likely UI state/validation inconsistency in Billing flow. See failed step(s), trace, and DOM snapshot for exact control state.

## Suggested Fix
1. Ensure required controls and validations are deterministic before Save.
2. Keep bill form transitions consistent after create/edit/delete actions.
3. Add API-level response checks for persistence and deletion consistency.

## Automation Evidence
- Spec: \`tests/billing/createInvoice.spec.ts\`
- POM: \`pages/BillingPage.ts\`
`;

  await writeFile(BUG_REPORT_PATH, markdown, 'utf-8');
};

test.describe('Billing - Invoice scenarios', () => {
  test('should open an existing bill and create invoice from form', async ({ page }) => {
    const billingPage = await loginAndOpenBilling(page);

    await billingPage.openFirstBillFromList();
    await billingPage.verifyInvoiceActionButtons();

    await billingPage.clickCreateInvoice();
    await billingPage.verifyStatusFlowVisible();
  });

  test('should keep user on billing form when invoice prerequisites are incomplete', async ({ page }) => {
    const billingPage = await loginAndOpenBilling(page);

    await billingPage.openNewForm();
    await billingPage.verifyInvoiceActionButtons();

    await billingPage.clickCreateInvoice();

    await expect(billingPage.getPatientCombobox()).toBeVisible();
    await expect(billingPage.getAddLineButton()).toBeVisible();
  });

  test('should complete billing end-to-end create edit delete flow with evidence and auto bug report on failure', async ({ page, browser }, testInfo) => {
    const startedAt = Date.now();
    const failures: ValidationFailure[] = [];
    const consoleErrors: string[] = [];
    const jsExceptions: string[] = [];
    const failedRequests: Array<{ url: string; status: number; method: string }> = [];

    let createdBillId = '';
    let baselineBillIds: string[] = [];

    const uniqueSeed = Date.now();
    const testData = {
      patient: 'Pat shalz',
      serviceCreate: 'Testing',
      descriptionCreate: `test${uniqueSeed}`,
      quantityCreate: '1001',
      unitPriceCreate: '1000',
      serviceEdit: 'Testing',
      descriptionEdit: `shalz${uniqueSeed}`,
      quantityEdit: '1002',
      unitPriceEdit: '1001',
      invalidQuantityAlpha: 'abc',
      invalidQuantitySpecial: '@@@',
      invalidQuantityNegative: '-1'
    };

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    page.on('pageerror', (error) => {
      jsExceptions.push(error.message);
    });

    page.on('response', (response) => {
      if (response.status() >= 400) {
        failedRequests.push({
          url: response.url(),
          status: response.status(),
          method: response.request().method()
        });
      }
    });

    try {
      const billingPage = await loginAndOpenBilling(page);

      await safeStep(
        failures,
        'Login',
        'User should be logged in and Billing list should load',
        async () => {
          await billingPage.ensureBillingListLoaded();
          await expect(billingPage.getNewButton()).toBeVisible();
        },
        false
      );

      await safeStep(
        failures,
        'Navigate to Billing',
        'Billing page should be fully loaded',
        async () => {
          await billingPage.openList();
          await billingPage.ensureBillingListLoaded();
          baselineBillIds = await billingPage.getVisibleBillNumbers();
        }
      );

      await safeStep(
        failures,
        'Create New Bill - Open Form',
        'New billing form should open with mandatory controls',
        async () => {
          await billingPage.openNewForm();
          await expect(billingPage.getPatientCombobox()).toBeVisible();
          await expect(billingPage.getAddLineButton()).toBeVisible();
          await expect(billingPage.getSaveButton()).toBeVisible();

          const createInvoiceVisible = await billingPage.getCreateInvoiceButton().isVisible();
          if (!createInvoiceVisible) {
            throw new Error('Next/Create Invoice button is not visible on billing form.');
          }

          await billingPage.verifyStatusFlowVisible();
        }
      );

      await safeStep(
        failures,
        'Field Validation - UI controls',
        'Mandatory controls and status flow should be visible and interactive',
        async () => {
          await expect(billingPage.getPatientCombobox()).toBeVisible();
          await expect(billingPage.getAddLineButton()).toBeVisible();
          await expect(billingPage.getSaveButton()).toBeVisible();
          await billingPage.verifyStatusFlowVisible();

          await billingPage.fillOrUpdateFirstLine(
            testData.serviceCreate,
            testData.descriptionCreate,
            testData.quantityCreate,
            testData.unitPriceCreate
          );
        }
      );

      await safeStep(
        failures,
        'Create New Bill - Save with valid data',
        'Bill should save successfully and generated bill ID should be available from list',
        async () => {
          await billingPage.selectPatient(testData.patient);
          await billingPage.save();

          await billingPage.openList();
          const afterCreateBillIds = await billingPage.getVisibleBillNumbers();

          createdBillId = afterCreateBillIds.find((id) => !baselineBillIds.includes(id)) ?? '';

          if (!createdBillId) {
            throw new Error(
              `Unable to identify newly created bill from list diff. Baseline: ${baselineBillIds.join(', ')} | Current: ${afterCreateBillIds.join(', ')}`
            );
          }

          await expect(createdBillId).toMatch(/^BILL\/\d+/);
        }
      );

      await safeStep(
        failures,
        'Validate created bill appears in list',
        'Created bill should exist in Billing list with saved values',
        async () => {
          if (!createdBillId) {
            throw new Error('Created bill ID is empty before list validation.');
          }

          await billingPage.openList();
          const visible = await billingPage.isBillVisibleInList(createdBillId);
          if (!visible) {
            throw new Error(`Created bill ${createdBillId} not found in list.`);
          }

          await billingPage.openBillByNumber(createdBillId);
          const createdSnapshot = await billingPage.getFirstLineSnapshot();
          expect(createdSnapshot.description).toContain(testData.descriptionCreate);
        }
      );

      await safeStep(
        failures,
        'Edit created bill',
        'Edited values should save successfully',
        async () => {
          await billingPage.fillOrUpdateFirstLine(
            testData.serviceEdit,
            testData.descriptionEdit,
            testData.quantityEdit,
            testData.unitPriceEdit
          );
          await billingPage.save();
        }
      );

      await safeStep(
        failures,
        'Verify edited values retained',
        'Edited values should persist after reopen',
        async () => {
          if (!createdBillId) {
            throw new Error('Created bill ID is empty before reopen/edit verification.');
          }

          await billingPage.openList();
          await billingPage.openBillByNumber(createdBillId);

          const editedSnapshot = await billingPage.getFirstLineSnapshot();

          expect(editedSnapshot.description).toContain(testData.descriptionEdit);
          expect(editedSnapshot.quantity).toContain('1002');
          expect(editedSnapshot.unitPrice).toContain('1001');
        }
      );

      await safeStep(
        failures,
        'Delete created bill',
        'Created bill should be deleted and absent after refresh/search',
        async () => {
          if (!createdBillId) {
            throw new Error('Created bill ID is empty before delete validation.');
          }

          await billingPage.deleteCurrentBill();

          await billingPage.openList();
          const stillVisible = await billingPage.isBillVisibleInList(createdBillId);
          if (stillVisible) {
            throw new Error(`Deleted bill ${createdBillId} is still visible in list.`);
          }

          await page.reload({ waitUntil: 'domcontentloaded' });
          await billingPage.ensureBillingListLoaded();

          const visibleAfterRefresh = await billingPage.isBillVisibleInList(createdBillId);
          if (visibleAfterRefresh) {
            throw new Error(`Deleted bill ${createdBillId} reappeared after refresh.`);
          }
        }
      );
    } catch (error) {
      const typed = error as Error;
      failures.push({
        step: 'Unhandled test exception',
        expected: 'Billing E2E flow should complete without unhandled exceptions.',
        actual: typed.message,
        stack: typed.stack
      });
    } finally {
      const evidenceDir = 'reports/evidence';
      await mkdir(evidenceDir, { recursive: true });

      const stamp = `${Date.now()}`;
      const failureScreenshot = join(evidenceDir, `billing-e2e-failure-${stamp}.png`);
      const fullPageScreenshot = join(evidenceDir, `billing-e2e-fullpage-${stamp}.png`);
      const domSnapshot = join(evidenceDir, `billing-e2e-dom-${stamp}.html`);
      const consoleLogPath = join(evidenceDir, `billing-e2e-console-${stamp}.json`);
      const networkLogPath = join(evidenceDir, `billing-e2e-network-${stamp}.json`);

      try {
        await page.screenshot({ path: failureScreenshot });
      } catch {
        // Ignore screenshot capture failure when page/context is closing.
      }

      try {
        await page.screenshot({ path: fullPageScreenshot, fullPage: true });
      } catch {
        // Ignore full-page screenshot capture failure when page/context is closing.
      }

      try {
        await writeFile(domSnapshot, await page.content(), 'utf-8');
      } catch {
        // Ignore DOM snapshot write failure if page is unavailable.
      }

      await writeFile(consoleLogPath, JSON.stringify({ consoleErrors, jsExceptions }, null, 2), 'utf-8');
      await writeFile(networkLogPath, JSON.stringify(failedRequests, null, 2), 'utf-8');

      try {
        await testInfo.attach('billing-e2e-dom-snapshot', {
          path: domSnapshot,
          contentType: 'text/html'
        });
      } catch {
        // Attachment can fail if dom snapshot was not created.
      }

      await testInfo.attach('billing-e2e-console-logs', {
        path: consoleLogPath,
        contentType: 'application/json'
      });

      await testInfo.attach('billing-e2e-network-logs', {
        path: networkLogPath,
        contentType: 'application/json'
      });

      if (failures.length > 0) {
        await writeBugReport({
          testInfo,
          failures,
          createdBillId,
          testData,
          consoleErrors,
          jsExceptions,
          failedRequests,
          evidence: {
            failureScreenshot,
            fullPageScreenshot,
            domSnapshot,
            consoleLogPath,
            networkLogPath
          },
          durationMs: Date.now() - startedAt,
          buildVersion: 'N/A',
          browserVersion: browser.version()
        });
      }
    }

    expect(
      failures,
      `Billing E2E CRUD validation failures detected. See ${BUG_REPORT_PATH} for auto-generated bug details.`
    ).toEqual([]);
  });
});
