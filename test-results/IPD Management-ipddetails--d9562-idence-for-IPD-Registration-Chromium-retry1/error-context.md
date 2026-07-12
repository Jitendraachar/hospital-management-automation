# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: IPD Management\ipddetails.spec.ts >> IPD Management - IPD Registration E2E >> should create, validate sections, and report bugs with evidence for IPD Registration
- Location: tests\IPD Management\ipddetails.spec.ts:91:7

# Error details

```
Error: IPD Registration E2E encountered validation failures. Check generated CSV bug report and evidence files.

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 60

- Array []
+ Array [
+   Object {
+     "actual": "expect(locator).toBeVisible() failed
+
+ Locator: getByRole('button', { name: 'User User is idle' })
+ Expected: visible
+ Timeout: 30000ms
+ Error: element(s) not found
+
+ Call log:
+   - Expect \"toBeVisible\" with timeout 30000ms
+   - waiting for getByRole('button', { name: 'User User is idle' })
+ ",
+     "expected": "User should login successfully and land on dashboard.",
+     "stack": "Error: expect(locator).toBeVisible() failed
+
+ Locator: getByRole('button', { name: 'User User is idle' })
+ Expected: visible
+ Timeout: 30000ms
+ Error: element(s) not found
+
+ Call log:
+   - Expect \"toBeVisible\" with timeout 30000ms
+   - waiting for getByRole('button', { name: 'User User is idle' })
+
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:164:81
+     at safeStep (C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:24:5)
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:146:7",
+     "step": "Step 1 – Login",
+   },
+   Object {
+     "actual": "expect(locator).toBeVisible() failed
+
+ Locator: getByRole('button', { name: 'User User is idle' })
+ Expected: visible
+ Timeout: 30000ms
+ Error: element(s) not found
+
+ Call log:
+   - Expect \"toBeVisible\" with timeout 30000ms
+   - waiting for getByRole('button', { name: 'User User is idle' })
+ ",
+     "expected": "IPD automation should complete without unhandled exceptions.",
+     "stack": "Error: expect(locator).toBeVisible() failed
+
+ Locator: getByRole('button', { name: 'User User is idle' })
+ Expected: visible
+ Timeout: 30000ms
+ Error: element(s) not found
+
+ Call log:
+   - Expect \"toBeVisible\" with timeout 30000ms
+   - waiting for getByRole('button', { name: 'User User is idle' })
+
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:164:81
+     at safeStep (C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:24:5)
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:146:7",
+     "step": "Unhandled test exception",
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner:     
  - generic [ref=e3]:
    - generic [ref=e5]:
      - generic [ref=e7]:
        - img "HealthPlix" [ref=e9]
        - generic [ref=e10]:
          - generic [ref=e11]: Shivansh
          - generic [ref=e12]: Cancer Center
      - generic [ref=e13]:
        - link "Dashboard" [ref=e14] [cursor=pointer]:
          - /url: "#"
        - link "Patients" [ref=e15] [cursor=pointer]:
          - /url: "#"
        - link "Doctors" [ref=e16] [cursor=pointer]:
          - /url: "#"
        - link "Prescriptions" [ref=e17] [cursor=pointer]:
          - /url: "#"
        - link "Lab Reports" [ref=e18] [cursor=pointer]:
          - /url: "#"
        - link "IPD Details" [ref=e19] [cursor=pointer]:
          - /url: "#"
        - link "Appointments" [ref=e20] [cursor=pointer]:
          - /url: "#"
        - link "Billings" [ref=e21] [cursor=pointer]:
          - /url: "#"
      - generic [ref=e22]:
        - generic [ref=e23]:
          - generic: 🔍
          - textbox "Search modules, features, tools..." [ref=e24]
        - button "User User is idle" [ref=e27] [cursor=pointer]:
          - generic [ref=e28]:
            - img "User" [ref=e29]
            - img "User is idle" [ref=e32]: 
          - text: 
    - generic [ref=e33]:
      - generic [ref=e34]:
        - generic [ref=e35]:
          - generic [ref=e36]:
            - generic [ref=e37]: 👥
            - generic [ref=e38]:
              - generic [ref=e39]: "9"
              - generic [ref=e40]: Total Patients
          - generic [ref=e41]: Up to today
        - generic [ref=e42]:
          - generic [ref=e43]:
            - generic [ref=e44]: 📆
            - generic [ref=e45]:
              - generic [ref=e46]: "0"
              - generic [ref=e47]: OPD Appointments
          - generic [ref=e48]: Confirmed, not done
        - generic [ref=e49]:
          - generic [ref=e50]:
            - generic [ref=e51]: 🧪
            - generic [ref=e52]:
              - generic [ref=e53]: "0"
              - generic [ref=e54]: Pending Lab Tests
          - generic [ref=e55]: Awaiting completion
        - generic [ref=e56]:
          - generic [ref=e57]:
            - generic [ref=e58]: 💲
            - generic [ref=e59]:
              - generic [ref=e60]: ₹1,003,002
              - generic [ref=e61]: Paid Revenue
          - generic [ref=e62]: Paid total
        - generic [ref=e63]:
          - generic [ref=e64]:
            - generic [ref=e65]: 🩺
            - generic [ref=e66]:
              - generic [ref=e67]: "3"
              - generic [ref=e68]: Active Doctors
          - generic [ref=e69]: Active on file
      - generic [ref=e71]:
        - generic [ref=e72]: Quick Access
        - heading "Hospital Operations" [level=2] [ref=e73]
        - paragraph [ref=e74]: Manage all hospital operations efficiently from one centralized dashboard
      - generic [ref=e75]:
        - generic [ref=e76] [cursor=pointer]:
          - generic [ref=e78]: 👤
          - generic [ref=e79]:
            - generic [ref=e80]: Patients
            - generic [ref=e81]: Patient records, appointments and charts
          - generic [ref=e82]: →
        - generic [ref=e83] [cursor=pointer]:
          - generic [ref=e85]: 🩺
          - generic [ref=e86]:
            - generic [ref=e87]: Doctors
            - generic [ref=e88]: Doctor profiles and availability
          - generic [ref=e89]: →
        - generic [ref=e90] [cursor=pointer]:
          - generic [ref=e92]: 💊
          - generic [ref=e93]:
            - generic [ref=e94]: Prescriptions
            - generic [ref=e95]: Prescription management and printouts
          - generic [ref=e96]: →
        - generic [ref=e97] [cursor=pointer]:
          - generic [ref=e99]: 🔬
          - generic [ref=e100]:
            - generic [ref=e101]: Lab Reports
            - generic [ref=e102]: View and update laboratory results
          - generic [ref=e103]: →
        - generic [ref=e104] [cursor=pointer]:
          - generic [ref=e106]: 🏥
          - generic [ref=e107]:
            - generic [ref=e108]: IPD Details
            - generic [ref=e109]: Inpatient registrations and care sheets
          - generic [ref=e110]: →
        - generic [ref=e111] [cursor=pointer]:
          - generic [ref=e113]: 📅
          - generic [ref=e114]:
            - generic [ref=e115]: Appointments
            - generic [ref=e116]: OPD appointments and scheduling
          - generic [ref=e117]: →
        - generic [ref=e118] [cursor=pointer]:
          - generic [ref=e120]: 💳
          - generic [ref=e121]:
            - generic [ref=e122]: Billing
            - generic [ref=e123]: Patient invoices and payments
          - generic [ref=e124]: →
        - generic [ref=e125] [cursor=pointer]:
          - generic [ref=e127]: 🏨
          - generic [ref=e128]:
            - generic [ref=e129]: Ward Management
            - generic [ref=e130]: Ward planning and allocation
          - generic [ref=e131]: →
        - generic [ref=e132] [cursor=pointer]:
          - generic [ref=e134]: 🛌
          - generic [ref=e135]:
            - generic [ref=e136]: Bed Management
            - generic [ref=e137]: Real-time bed availability
          - generic [ref=e138]: →
  - generic:
    - generic:
      - paragraph: Press esc to exit full screen
```

# Test source

```ts
  320 |         }
  321 |       );
  322 | 
  323 |       await safeStep(
  324 |         failures,
  325 |         'Step 5 – Delete created IPD registration',
  326 |         'Deleted record should not appear in list/search after refresh.',
  327 |         async () => {
  328 |           await page.getByRole('button', { name: 'Actions menu' }).first().click();
  329 | 
  330 |           const deleteMenu = page.getByRole('menuitem', { name: /^Delete$/i }).first();
  331 |           const deleteButton = page.getByRole('button', { name: /^Delete$/i }).first();
  332 | 
  333 |           if (await deleteMenu.isVisible().catch(() => false)) {
  334 |             await deleteMenu.click();
  335 |           } else if (await deleteButton.isVisible().catch(() => false)) {
  336 |             await deleteButton.click();
  337 |           }
  338 | 
  339 |           const confirmDelete = page.getByRole('button', { name: /Delete|Ok|Confirm/i }).first();
  340 |           if (await confirmDelete.isVisible().catch(() => false)) {
  341 |             await confirmDelete.click();
  342 |           }
  343 | 
  344 |           await page.goto(`${BASE_URL}/action-372/action-380`, { waitUntil: 'domcontentloaded' });
  345 |           const searchBox = page.getByRole('searchbox', { name: 'Search...' });
  346 |           await searchBox.fill(createdIpdRef);
  347 | 
  348 |           const visibleAfterDelete = await page.getByRole('cell', { name: new RegExp(`^${createdIpdRef}$`) }).isVisible().catch(() => false);
  349 |           if (visibleAfterDelete) {
  350 |             throw new Error(`Deleted IPD record ${createdIpdRef} is still visible.`);
  351 |           }
  352 | 
  353 |           await page.reload({ waitUntil: 'domcontentloaded' });
  354 |           await searchBox.fill(createdIpdRef);
  355 | 
  356 |           const visibleAfterReload = await page.getByRole('cell', { name: new RegExp(`^${createdIpdRef}$`) }).isVisible().catch(() => false);
  357 |           if (visibleAfterReload) {
  358 |             throw new Error(`Deleted IPD record ${createdIpdRef} reappeared after reload.`);
  359 |           }
  360 |         }
  361 |       );
  362 |     } catch (error) {
  363 |       const typed = error as Error;
  364 |       failures.push({
  365 |         step: 'Unhandled test exception',
  366 |         expected: 'IPD automation should complete without unhandled exceptions.',
  367 |         actual: typed.message,
  368 |         stack: typed.stack
  369 |       });
  370 |     } finally {
  371 |       try {
  372 |         await page.screenshot({ path: failureScreenshot });
  373 |       } catch {
  374 |         // no-op
  375 |       }
  376 | 
  377 |       try {
  378 |         await page.screenshot({ path: fullPageScreenshot, fullPage: true });
  379 |       } catch {
  380 |         // no-op
  381 |       }
  382 | 
  383 |       try {
  384 |         await writeFile(domSnapshot, await page.content(), 'utf-8');
  385 |       } catch {
  386 |         // no-op
  387 |       }
  388 | 
  389 |       await writeFile(consoleLogPath, JSON.stringify({ consoleErrors }, null, 2), 'utf-8');
  390 |       await writeFile(networkLogPath, JSON.stringify(networkFailures, null, 2), 'utf-8');
  391 | 
  392 |       await testInfo.attach('ipd-dom-snapshot', { path: domSnapshot, contentType: 'text/html' }).catch(() => undefined);
  393 |       await testInfo.attach('ipd-console-logs', { path: consoleLogPath, contentType: 'application/json' }).catch(() => undefined);
  394 |       await testInfo.attach('ipd-network-logs', { path: networkLogPath, contentType: 'application/json' }).catch(() => undefined);
  395 | 
  396 |       if (failures.length > 0) {
  397 |         const bugCsv = await writeBugCsv(failures, {
  398 |           timestamp: new Date().toISOString(),
  399 |           module: 'IPD Management',
  400 |           feature: 'IPD Registration',
  401 |           browser: browser.version(),
  402 |           os: process.platform,
  403 |           buildVersion: 'N/A',
  404 |           createdIpdRef,
  405 |           consoleErrors,
  406 |           networkFailures,
  407 |           evidencePaths: [failureScreenshot, fullPageScreenshot, domSnapshot, consoleLogPath, networkLogPath]
  408 |         });
  409 | 
  410 |         await testInfo.attach('ipd-bug-report-csv', {
  411 |           path: bugCsv,
  412 |           contentType: 'text/csv'
  413 |         });
  414 |       }
  415 |     }
  416 | 
  417 |     expect(
  418 |       failures,
  419 |       'IPD Registration E2E encountered validation failures. Check generated CSV bug report and evidence files.'
> 420 |     ).toEqual([]);
      |       ^ Error: IPD Registration E2E encountered validation failures. Check generated CSV bug report and evidence files.
  421 | 
  422 |     const durationMs = Date.now() - startedAt;
  423 |     await testInfo.attach('ipd-execution-duration-ms', {
  424 |       body: Buffer.from(String(durationMs)),
  425 |       contentType: 'text/plain'
  426 |     });
  427 |   });
  428 | });
  429 | 
```