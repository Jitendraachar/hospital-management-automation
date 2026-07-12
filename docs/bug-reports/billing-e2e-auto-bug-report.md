# Bug Report - Billing E2E CRUD Flow Failure

## Bug Title
Billing end-to-end CRUD flow validation failure: Unhandled test exception

## Module
Billing

## Feature
Create → Edit → Delete Bill

## Environment
- URL: https://team40.qaaerp.com/odoo
- OS: win32
- Browser: Chromium 149.0.7827.55
- Build Version: N/A
- Timestamp: 2026-07-12T07:32:23.304Z

## Severity
High

## Priority
High

## Preconditions
1. Valid login credentials available.
2. Billing module is accessible.
3. Patient `Pat shalz` exists.

## Test Data
- Created Bill ID: Not created
- Data: {
  "patient": "Pat shalz",
  "serviceCreate": "Testing",
  "descriptionCreate": "test1783841524312",
  "quantityCreate": "1001",
  "unitPriceCreate": "1000",
  "serviceEdit": "Testing",
  "descriptionEdit": "shalz1783841524312",
  "quantityEdit": "1002",
  "unitPriceEdit": "1001",
  "invalidQuantityAlpha": "abc",
  "invalidQuantitySpecial": "@@@",
  "invalidQuantityNegative": "-1"
}

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
### Failure 1
- Step: Unhandled test exception
- Expected: Billing E2E flow should complete without unhandled exceptions.
- Actual: locator.waitFor: Timeout 10000ms exceeded.
Call log:
[2m  - waiting for locator('main form').first().getByRole('button', { name: /Log in/i }) to be visible[22m

- Stack: ```
locator.waitFor: Timeout 10000ms exceeded.
Call log:
[2m  - waiting for locator('main form').first().getByRole('button', { name: /Log in/i }) to be visible[22m

    at LoginPage.open (C:\Users\Shalini Kumari\hospital-management-automation\LoginPage.ts:32:32)
    at loginAndOpenBilling (C:\Users\Shalini Kumari\hospital-management-automation\tests\billing\billingTestSetup.ts:17:5)
    at C:\Users\Shalini Kumari\hospital-management-automation\tests\billing\createInvoice.spec.ts:255:27
```

## Console Errors
```json
[]
```

## JavaScript Exceptions
```json
[
  "Cannot read properties of null (reading 'querySelector')",
  "Cannot read properties of null (reading 'querySelector')"
]
```

## API / Network Failures
```json
[]
```

## Evidence
- Failure Screenshot: `reports\evidence\billing-e2e-failure-1783841542802.png`
- Full-page Screenshot: `reports\evidence\billing-e2e-fullpage-1783841542802.png`
- DOM Snapshot: `reports\evidence\billing-e2e-dom-1783841542802.html`
- Console Logs: `reports\evidence\billing-e2e-console-1783841542802.json`
- Network Logs: `reports\evidence\billing-e2e-network-1783841542802.json`
- Video: Playwright retained-on-failure artifact in `test-results/`
- Trace: Playwright retained-on-failure artifact in `test-results/`

## Execution Metadata
- Duration: 18991 ms
- Failed HTTP count: 0
- Console error count: 0
- JS exception count: 2

## Root Cause Analysis (Initial)
Likely UI state/validation inconsistency in Billing flow. See failed step(s), trace, and DOM snapshot for exact control state.

## Suggested Fix
1. Ensure required controls and validations are deterministic before Save.
2. Keep bill form transitions consistent after create/edit/delete actions.
3. Add API-level response checks for persistence and deletion consistency.

## Automation Evidence
- Spec: `tests/billing/createInvoice.spec.ts`
- POM: `pages/BillingPage.ts`
