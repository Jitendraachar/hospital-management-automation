import { expect, test, type Page, type TestInfo } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

type ValidationFailure = {
  step: string;
  expected: string;
  actual: string;
  stack?: string;
};

const BASE_URL = 'https://team40.qaaerp.com/odoo';
const USERNAME = 'team40';
const PASSWORD = 'vASPFtSh4d';

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

const getIpdRefsFromList = async (page: Page): Promise<string[]> => {
  const refCells = page.getByRole('cell', { name: /^IPD\/\d+/ });
  const count = await refCells.count();
  const refs: string[] = [];

  for (let i = 0; i < count; i++) {
    const value = (await refCells.nth(i).textContent())?.trim() ?? '';
    if (value && !refs.includes(value)) {
      refs.push(value);
    }
  }

  return refs;
};

const writeBugCsv = async (
  failures: ValidationFailure[],
  metadata: {
    timestamp: string;
    module: string;
    feature: string;
    browser: string;
    os: string;
    buildVersion: string;
    createdIpdRef: string;
    consoleErrors: string[];
    networkFailures: Array<{ url: string; status: number; method: string }>;
    evidencePaths: string[];
  }
): Promise<string> => {
  await mkdir('excel', { recursive: true });

  const filePath = `excel/bug_report_ipd_registration_e2e_${Date.now()}.csv`;
  const header =
    'Bug Title,Module,Feature,Environment,Browser,Build Version,Severity,Priority,Step,Expected,Actual,Reproducibility,Console Errors,Network Failures,Evidence,Timestamp\n';

  const rows = failures.map((f, idx) => {
    const bugTitle = `IPD Registration validation failure ${idx + 1}: ${f.step}`;
    const env = `${BASE_URL} (${metadata.os})`;
    const consoleErrorText = metadata.consoleErrors.join(' | ').replace(/"/g, '""');
    const networkText = JSON.stringify(metadata.networkFailures).replace(/"/g, '""');
    const evidence = metadata.evidencePaths.join(' | ').replace(/"/g, '""');

    return `"${bugTitle}","${metadata.module}","${metadata.feature}","${env}","${metadata.browser}","${metadata.buildVersion}","High","High","${f.step.replace(/"/g, '""')}","${f.expected.replace(/"/g, '""')}","${f.actual.replace(/"/g, '""')}","Yes","${consoleErrorText}","${networkText}","${evidence}","${metadata.timestamp}"`;
  });

  await writeFile(filePath, header + rows.join('\n'), 'utf-8');
  return filePath;
};

test.describe('IPD Management - IPD Registration E2E', () => {
  test('should create, validate sections, and report bugs with evidence for IPD Registration', async ({ page, browser }, testInfo) => {
    const startedAt = Date.now();
    const failures: ValidationFailure[] = [];
    const consoleErrors: string[] = [];
    const networkFailures: Array<{ url: string; status: number; method: string }> = [];

    let createdIpdRef = '';
    const seed = Date.now();

    const data = {
      patientLookup: 'Pat Shalz',
      patientName: `patienttest${seed}`,
      phone: '9876543210',
      email: `patient${seed}@mailinator.com`,
      referredBy: 'father test',
      dateOfBirth: '1995-01-01',
      gender: 'Male',
      bloodType: 'O+',
      address: `Address test ${seed}`,
      idDocumentType: 'Aadhaar',
      idDocumentNumber: `${seed}`,
      invalidPhoneAlpha: 'abcdef',
      invalidPhoneSpecial: '@@@###',
      invalidIdNumberAlpha: 'ID-ABCD',
      editPatientName: `patienttest${seed}-edited`,
      editReferredBy: 'father test edited'
    };

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    page.on('response', (response) => {
      if (response.status() >= 400) {
        networkFailures.push({
          url: response.url(),
          status: response.status(),
          method: response.request().method()
        });
      }
    });

    const evidenceDir = 'reports/evidence';
    await mkdir(evidenceDir, { recursive: true });

    const stamp = `${Date.now()}`;
    const failureScreenshot = join(evidenceDir, `ipd-registration-failure-${stamp}.png`);
    const fullPageScreenshot = join(evidenceDir, `ipd-registration-fullpage-${stamp}.png`);
    const domSnapshot = join(evidenceDir, `ipd-registration-dom-${stamp}.html`);
    const consoleLogPath = join(evidenceDir, `ipd-registration-console-${stamp}.json`);
    const networkLogPath = join(evidenceDir, `ipd-registration-network-${stamp}.json`);

    try {
      await safeStep(
        failures,
        'Step 1 – Login',
        'User should login successfully and land on dashboard.',
        async () => {
          await page.goto(BASE_URL);
          const userStatus = page.getByRole('button', { name: 'User User is idle' });

          if (!(await userStatus.isVisible().catch(() => false))) {
            const emailInput = page.getByPlaceholder('Enter your email');
            const passwordInput = page.getByPlaceholder('Enter your password');
            const loginButton = page.getByRole('button', { name: /Log in/i });

            await emailInput.fill(USERNAME);
            await passwordInput.fill(PASSWORD);
            await loginButton.click();
          }

          await expect(page.getByRole('button', { name: 'User User is idle' })).toBeVisible({ timeout: 30000 });
        },
        false
      );

      let baselineIpdRefs: string[] = [];

      await safeStep(
        failures,
        'Step 2 – Navigate to IPD Registration',
        'Dashboard → IPD Management list should load with New button visible.',
        async () => {
          await page.goto(`${BASE_URL}/action-372/action-380`, { waitUntil: 'domcontentloaded' });
          await expect(page.getByRole('button', { name: 'New' })).toBeVisible({ timeout: 30000 });
          baselineIpdRefs = await getIpdRefsFromList(page);
        }
      );

      await safeStep(
        failures,
        'Step 3 – Open IPD Registration form',
        'Clicking New should open IPD registration form with Save button and Patient field.',
        async () => {
          await page.getByRole('button', { name: 'New' }).click();
          await expect(page.getByRole('button', { name: 'Save manually' })).toBeVisible();
          await expect(page.getByRole('combobox', { name: 'Patient' })).toBeVisible();
        }
      );

      await safeStep(
        failures,
        'Step 3 – Fill Personal Information',
        'Personal Information fields should accept valid values.',
        async () => {
          await page.getByRole('combobox', { name: 'Patient' }).fill(data.patientLookup);
          await page.keyboard.press('Enter');

          await page.getByRole('combobox', { name: 'Doctor Incharge' }).fill('test1');
          await page.keyboard.press('Enter');

          await page.getByRole('textbox', { name: 'Patient Name' }).fill(data.patientName);
          await page.getByRole('textbox', { name: 'Date of Birth' }).fill(data.dateOfBirth);
          await page.getByRole('textbox', { name: 'Gender' }).fill(data.gender);
          await page.getByRole('textbox', { name: 'Blood Type' }).fill(data.bloodType);
        }
      );

      await safeStep(
        failures,
        'Step 3 – Fill Contact & Address',
        'Contact and address details should accept valid values.',
        async () => {
          const phoneField = page.getByRole('textbox', { name: 'Phone' });
          await phoneField.fill(data.phone);
          await page.getByRole('textbox', { name: 'Email' }).fill(data.email);
          await page.getByRole('textbox', { name: 'Address' }).fill(data.address);
        }
      );

      await safeStep(
        failures,
        'Step 3 – Fill Emergency Contact / Reference',
        'Reference field should accept valid value.',
        async () => {
          await page.getByRole('textbox', { name: 'Referred By' }).fill(data.referredBy);
        }
      );

      await safeStep(
        failures,
        'Step 3 – Fill Identity & Administrative',
        'Identity document fields should accept valid values.',
        async () => {
          await page.getByRole('textbox', { name: 'ID Document Type' }).fill(data.idDocumentType);
          await page.getByRole('textbox', { name: 'ID Document Number' }).fill(data.idDocumentNumber);
        }
      );

      await safeStep(
        failures,
        'Step 3 – Validate section tabs',
        'Diagnosis, Notes, and Discharge Details tabs should be navigable.',
        async () => {
          await page.getByRole('tab', { name: 'Diagnosis' }).click();
          await expect(page.getByRole('tab', { name: 'Diagnosis' })).toBeVisible();

          await page.getByRole('tab', { name: 'Notes' }).click();
          await expect(page.getByRole('tab', { name: 'Notes' })).toBeVisible();

          await page.getByRole('tab', { name: 'Discharge Details' }).click();
          await expect(page.getByRole('tab', { name: 'Discharge Details' })).toBeVisible();

          await page.getByRole('tab', { name: 'Additional Charges' }).click();
        }
      );

      await safeStep(
        failures,
        'Step 3 – Rule-based negative checks',
        'Invalid values should be handled safely (no crash and field remains usable).',
        async () => {
          const phoneField = page.getByRole('textbox', { name: 'Phone' });
          await phoneField.fill(data.invalidPhoneAlpha);
          await expect(phoneField).toBeVisible();

          await phoneField.fill(data.invalidPhoneSpecial);
          await expect(phoneField).toBeVisible();

          const idNumberField = page.getByRole('textbox', { name: 'ID Document Number' });
          await idNumberField.fill(data.invalidIdNumberAlpha);
          await expect(idNumberField).toBeVisible();

          await phoneField.fill(data.phone);
          await idNumberField.fill(data.idDocumentNumber);
        }
      );

      await safeStep(
        failures,
        'Step 3 – Save IPD Registration',
        'Save should succeed and new IPD Reference should be generated.',
        async () => {
          await page.getByRole('button', { name: 'Save manually' }).click();
          await page.goto(`${BASE_URL}/action-372/action-380`, { waitUntil: 'domcontentloaded' });

          const currentRefs = await getIpdRefsFromList(page);
          createdIpdRef = currentRefs.find((ref) => !baselineIpdRefs.includes(ref)) ?? '';

          if (!createdIpdRef) {
            throw new Error(`Unable to detect newly created IPD ref. Before: ${baselineIpdRefs.join(', ')} | After: ${currentRefs.join(', ')}`);
          }

          await expect(createdIpdRef).toMatch(/^IPD\/\d+/);
        }
      );

      await safeStep(
        failures,
        'Step 4 – Edit created IPD registration',
        'Edited values should save and persist.',
        async () => {
          await page.getByRole('cell', { name: new RegExp(`^${createdIpdRef}$`) }).dblclick();
          await expect(page.getByRole('textbox', { name: 'Patient Name' })).toBeVisible();

          await page.getByRole('textbox', { name: 'Patient Name' }).fill(data.editPatientName);
          await page.getByRole('textbox', { name: 'Referred By' }).fill(data.editReferredBy);
          await page.getByRole('button', { name: 'Save manually' }).click();

          await page.goto(`${BASE_URL}/action-372/action-380`, { waitUntil: 'domcontentloaded' });
          await page.getByRole('cell', { name: new RegExp(`^${createdIpdRef}$`) }).dblclick();

          const patientName = await page.getByRole('textbox', { name: 'Patient Name' }).inputValue();
          const referredBy = await page.getByRole('textbox', { name: 'Referred By' }).inputValue();

          expect(patientName).toContain(data.editPatientName);
          expect(referredBy).toContain(data.editReferredBy);
        }
      );

      await safeStep(
        failures,
        'Step 5 – Delete created IPD registration',
        'Deleted record should not appear in list/search after refresh.',
        async () => {
          await page.getByRole('button', { name: 'Actions menu' }).first().click();

          const deleteMenu = page.getByRole('menuitem', { name: /^Delete$/i }).first();
          const deleteButton = page.getByRole('button', { name: /^Delete$/i }).first();

          if (await deleteMenu.isVisible().catch(() => false)) {
            await deleteMenu.click();
          } else if (await deleteButton.isVisible().catch(() => false)) {
            await deleteButton.click();
          }

          const confirmDelete = page.getByRole('button', { name: /Delete|Ok|Confirm/i }).first();
          if (await confirmDelete.isVisible().catch(() => false)) {
            await confirmDelete.click();
          }

          await page.goto(`${BASE_URL}/action-372/action-380`, { waitUntil: 'domcontentloaded' });
          const searchBox = page.getByRole('searchbox', { name: 'Search...' });
          await searchBox.fill(createdIpdRef);

          const visibleAfterDelete = await page.getByRole('cell', { name: new RegExp(`^${createdIpdRef}$`) }).isVisible().catch(() => false);
          if (visibleAfterDelete) {
            throw new Error(`Deleted IPD record ${createdIpdRef} is still visible.`);
          }

          await page.reload({ waitUntil: 'domcontentloaded' });
          await searchBox.fill(createdIpdRef);

          const visibleAfterReload = await page.getByRole('cell', { name: new RegExp(`^${createdIpdRef}$`) }).isVisible().catch(() => false);
          if (visibleAfterReload) {
            throw new Error(`Deleted IPD record ${createdIpdRef} reappeared after reload.`);
          }
        }
      );
    } catch (error) {
      const typed = error as Error;
      failures.push({
        step: 'Unhandled test exception',
        expected: 'IPD automation should complete without unhandled exceptions.',
        actual: typed.message,
        stack: typed.stack
      });
    } finally {
      try {
        await page.screenshot({ path: failureScreenshot });
      } catch {
        // no-op
      }

      try {
        await page.screenshot({ path: fullPageScreenshot, fullPage: true });
      } catch {
        // no-op
      }

      try {
        await writeFile(domSnapshot, await page.content(), 'utf-8');
      } catch {
        // no-op
      }

      await writeFile(consoleLogPath, JSON.stringify({ consoleErrors }, null, 2), 'utf-8');
      await writeFile(networkLogPath, JSON.stringify(networkFailures, null, 2), 'utf-8');

      await testInfo.attach('ipd-dom-snapshot', { path: domSnapshot, contentType: 'text/html' }).catch(() => undefined);
      await testInfo.attach('ipd-console-logs', { path: consoleLogPath, contentType: 'application/json' }).catch(() => undefined);
      await testInfo.attach('ipd-network-logs', { path: networkLogPath, contentType: 'application/json' }).catch(() => undefined);

      if (failures.length > 0) {
        const bugCsv = await writeBugCsv(failures, {
          timestamp: new Date().toISOString(),
          module: 'IPD Management',
          feature: 'IPD Registration',
          browser: browser.version(),
          os: process.platform,
          buildVersion: 'N/A',
          createdIpdRef,
          consoleErrors,
          networkFailures,
          evidencePaths: [failureScreenshot, fullPageScreenshot, domSnapshot, consoleLogPath, networkLogPath]
        });

        await testInfo.attach('ipd-bug-report-csv', {
          path: bugCsv,
          contentType: 'text/csv'
        });
      }
    }

    expect(
      failures,
      'IPD Registration E2E encountered validation failures. Check generated CSV bug report and evidence files.'
    ).toEqual([]);

    const durationMs = Date.now() - startedAt;
    await testInfo.attach('ipd-execution-duration-ms', {
      body: Buffer.from(String(durationMs)),
      contentType: 'text/plain'
    });
  });
});
