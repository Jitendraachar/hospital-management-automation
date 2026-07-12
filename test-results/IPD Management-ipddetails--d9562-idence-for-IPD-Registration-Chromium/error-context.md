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
+ Received  + 63

- Array []
+ Array [
+   Object {
+     "actual": "locator.fill: Timeout 10000ms exceeded.
+ Call log:
+   - waiting for getByRole('textbox', { name: 'Phone' })
+ ",
+     "expected": "Invalid values should be handled safely (no crash and field remains usable).",
+     "stack": "locator.fill: Timeout 10000ms exceeded.
+ Call log:
+   - waiting for getByRole('textbox', { name: 'Phone' })
+
+     at action (C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:266:28)
+     at safeStep (C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:24:11)
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:260:13",
+     "step": "Step 3 – Rule-based negative checks",
+   },
+   Object {
+     "actual": "expect(locator).toBeVisible() failed
+
+ Locator: getByRole('textbox', { name: 'Patient Name' })
+ Expected: visible
+ Timeout: 5000ms
+ Error: element(s) not found
+
+ Call log:
+   - Expect \"toBeVisible\" with timeout 5000ms
+   - waiting for getByRole('textbox', { name: 'Patient Name' })
+ ",
+     "expected": "Edited values should save and persist.",
+     "stack": "Error: expect(locator).toBeVisible() failed
+
+ Locator: getByRole('textbox', { name: 'Patient Name' })
+ Expected: visible
+ Timeout: 5000ms
+ Error: element(s) not found
+
+ Call log:
+   - Expect \"toBeVisible\" with timeout 5000ms
+   - waiting for getByRole('textbox', { name: 'Patient Name' })
+
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:306:77
+     at safeStep (C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:24:5)
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:300:7",
+     "step": "Step 4 – Edit created IPD registration",
+   },
+   Object {
+     "actual": "Deleted IPD record IPD/0008 is still visible.",
+     "expected": "Deleted record should not appear in list/search after refresh.",
+     "stack": "Error: Deleted IPD record IPD/0008 is still visible.
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:350:19
+     at safeStep (C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:24:5)
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\tests\\IPD Management\\ipddetails.spec.ts:323:7
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\node_modules\\playwright\\lib\\worker\\workerProcessEntry.js:1662:9
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\node_modules\\playwright\\lib\\worker\\workerProcessEntry.js:1154:11
+     at TimeoutManager.withRunnable (C:\\Users\\Shalini Kumari\\hospital-management-automation\\node_modules\\playwright\\lib\\worker\\workerProcessEntry.js:425:14)
+     at TestInfoImpl._runWithTimeout (C:\\Users\\Shalini Kumari\\hospital-management-automation\\node_modules\\playwright\\lib\\worker\\workerProcessEntry.js:1152:7)
+     at C:\\Users\\Shalini Kumari\\hospital-management-automation\\node_modules\\playwright\\lib\\worker\\workerProcessEntry.js:1660:7
+     at WorkerMain._runTest (C:\\Users\\Shalini Kumari\\hospital-management-automation\\node_modules\\playwright\\lib\\worker\\workerProcessEntry.js:1633:5)
+     at WorkerMain.runTestGroup (C:\\Users\\Shalini Kumari\\hospital-management-automation\\node_modules\\playwright\\lib\\worker\\workerProcessEntry.js:1528:9)
+     at process.<anonymous> (C:\\Users\\Shalini Kumari\\hospital-management-automation\\node_modules\\playwright\\lib\\common\\index.js:1991:25)",
+     "step": "Step 5 – Delete created IPD registration",
+   },
+ ]
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - navigation [ref=e3]:
      - button "" [ref=e5] [cursor=pointer]:
        - generic [ref=e6]: 
      - menuitem "Shivansh" [ref=e7] [cursor=pointer]
      - menu [ref=e8]:
        - menuitem "Dashboard" [ref=e9] [cursor=pointer]
        - button "Patients" [ref=e10] [cursor=pointer]:
          - generic [ref=e11]: Patients
        - button "Doctors" [ref=e12] [cursor=pointer]:
          - generic [ref=e13]: Doctors
        - button "Management" [ref=e14] [cursor=pointer]:
          - generic [ref=e15]: Management
      - menu [ref=e16]:
        - button "My Company" [disabled] [ref=e18]:
          - text: 
          - generic [ref=e19]: My Company
        - generic: 
        - button "User User is idle" [ref=e21] [cursor=pointer]:
          - generic [ref=e22]:
            - img "User" [ref=e23]
            - img "User is idle" [ref=e26]: 
          - text: 
  - generic [ref=e28]:
    - generic [ref=e30]:
      - generic [ref=e31]:
        - button " Back to Dashboard" [ref=e32] [cursor=pointer]:
          - generic [ref=e33]: 
          - text: Back to Dashboard
        - button "New" [ref=e35] [cursor=pointer]
        - generic [ref=e36]:
          - list [ref=e37]:
            - listitem [ref=e38]:
              - link "Dashboard" [ref=e39] [cursor=pointer]:
                - /url: /odoo/action-372
          - generic [ref=e40]:
            - generic [ref=e42]: IPD Management
            - button "Actions menu" [ref=e46] [cursor=pointer]:
              - generic [ref=e47]: 
      - search [ref=e49]:
        - search [ref=e50]:
          - button "Search..." [ref=e51] [cursor=pointer]:
            - img [ref=e52]: 
          - searchbox "Search..." [active] [ref=e54]: IPD/0008
        - button "" [ref=e55] [cursor=pointer]
      - search [ref=e57]:
        - navigation "Pager" [ref=e58]:
          - generic [ref=e59]:
            - generic [ref=e60]: 1-9
            - text: / 9
          - generic [ref=e61]:
            - button "Previous" [disabled]:
              - generic: 
            - button "Next" [disabled]:
              - generic: 
    - main [ref=e62]:
      - table [ref=e64]:
        - rowgroup [ref=e65]:
          - row "IPD Ref  Patient  Doctor Incharge  Ward  Bed  Admission Date  Discharge Date  Days  Bed Cost  Extra Charges  Total Cost  Status  " [ref=e66]:
            - columnheader [ref=e67] [cursor=pointer]:
              - checkbox [ref=e69]
            - columnheader "IPD Ref " [ref=e70] [cursor=pointer]:
              - generic [ref=e71]:
                - generic [ref=e72]: IPD Ref
                - generic [ref=e73]: 
            - columnheader "Patient " [ref=e75] [cursor=pointer]:
              - generic [ref=e76]:
                - generic [ref=e77]: Patient
                - generic [ref=e78]: 
            - columnheader "Doctor Incharge " [ref=e80] [cursor=pointer]:
              - generic [ref=e81]:
                - generic [ref=e82]: Doctor Incharge
                - generic [ref=e83]: 
            - columnheader "Ward " [ref=e85] [cursor=pointer]:
              - generic [ref=e86]:
                - generic [ref=e87]: Ward
                - generic [ref=e88]: 
            - columnheader "Bed " [ref=e90] [cursor=pointer]:
              - generic [ref=e91]:
                - generic [ref=e92]: Bed
                - generic [ref=e93]: 
            - columnheader "Admission Date " [ref=e95] [cursor=pointer]:
              - generic [ref=e96]:
                - generic [ref=e97]: Admission Date
                - generic [ref=e98]: 
            - columnheader "Discharge Date " [ref=e100] [cursor=pointer]:
              - generic [ref=e101]:
                - generic [ref=e102]: Discharge Date
                - generic [ref=e103]: 
            - columnheader "Days " [ref=e105] [cursor=pointer]:
              - generic [ref=e106]:
                - generic [ref=e107]: Days
                - generic [ref=e108]: 
            - columnheader "Bed Cost " [ref=e110] [cursor=pointer]:
              - generic [ref=e111]:
                - generic [ref=e112]: Bed Cost
                - generic [ref=e113]: 
            - columnheader "Extra Charges " [ref=e115] [cursor=pointer]:
              - generic [ref=e116]:
                - generic [ref=e117]: Extra Charges
                - generic [ref=e118]: 
            - columnheader "Total Cost " [ref=e120] [cursor=pointer]:
              - generic [ref=e121]:
                - generic [ref=e122]: Total Cost
                - generic [ref=e123]: 
            - columnheader "Status " [ref=e125] [cursor=pointer]:
              - generic [ref=e126]:
                - generic [ref=e127]: Status
                - generic [ref=e128]: 
            - columnheader "" [ref=e130]:
              - button "" [ref=e132] [cursor=pointer]:
                - generic [ref=e133]: 
        - rowgroup [ref=e134]:
          - row "IPD/0001 Shal1 doc1 Jul 11, 10:29 AM 1 0.00 0.00 0.00 Admitted" [ref=e135]:
            - cell [ref=e136]:
              - checkbox [ref=e138] [cursor=pointer]
            - cell "IPD/0001" [ref=e139] [cursor=pointer]
            - cell "Shal1" [ref=e140] [cursor=pointer]
            - cell "doc1" [ref=e141] [cursor=pointer]
            - cell [ref=e142] [cursor=pointer]
            - cell [ref=e143] [cursor=pointer]
            - cell "Jul 11, 10:29 AM" [ref=e144] [cursor=pointer]
            - cell [ref=e145] [cursor=pointer]
            - cell "1" [ref=e146] [cursor=pointer]
            - cell "0.00" [ref=e147] [cursor=pointer]
            - cell "0.00" [ref=e148] [cursor=pointer]
            - cell "0.00" [ref=e149] [cursor=pointer]
            - cell "Admitted" [ref=e150] [cursor=pointer]:
              - generic [ref=e152]: Admitted
            - cell [ref=e153]
          - row "IPD/0002 bbbbbjhj test1 Jul 11, 10:16 PM 1 0.00 0.00 0.00 Admitted" [ref=e154]:
            - cell [ref=e155]:
              - checkbox [ref=e157] [cursor=pointer]
            - cell "IPD/0002" [ref=e158] [cursor=pointer]
            - cell "bbbbbjhj" [ref=e159] [cursor=pointer]
            - cell "test1" [ref=e160] [cursor=pointer]
            - cell [ref=e161] [cursor=pointer]
            - cell [ref=e162] [cursor=pointer]
            - cell "Jul 11, 10:16 PM" [ref=e163] [cursor=pointer]
            - cell [ref=e164] [cursor=pointer]
            - cell "1" [ref=e165] [cursor=pointer]
            - cell "0.00" [ref=e166] [cursor=pointer]
            - cell "0.00" [ref=e167] [cursor=pointer]
            - cell "0.00" [ref=e168] [cursor=pointer]
            - cell "Admitted" [ref=e169] [cursor=pointer]:
              - generic [ref=e171]: Admitted
            - cell [ref=e172]
          - row "IPD/0003 Pat Shalz Jul 12, 9:17 AM 1 0.00 500.00 500.00 Draft" [ref=e173]:
            - cell [ref=e174]:
              - checkbox [ref=e176] [cursor=pointer]
            - cell "IPD/0003" [ref=e177] [cursor=pointer]
            - cell "Pat Shalz" [ref=e178] [cursor=pointer]
            - cell [ref=e179] [cursor=pointer]
            - cell [ref=e180] [cursor=pointer]
            - cell [ref=e181] [cursor=pointer]
            - cell "Jul 12, 9:17 AM" [ref=e182] [cursor=pointer]
            - cell [ref=e183] [cursor=pointer]
            - cell "1" [ref=e184] [cursor=pointer]
            - cell "0.00" [ref=e185] [cursor=pointer]
            - cell "500.00" [ref=e186] [cursor=pointer]
            - cell "500.00" [ref=e187] [cursor=pointer]
            - cell "Draft" [ref=e188] [cursor=pointer]:
              - generic [ref=e190]: Draft
            - cell [ref=e191]
          - row "IPD/0004 Pat Shalz test1 Jul 12, 1:27 PM 1 0.00 0.00 0.00 Draft" [ref=e192]:
            - cell [ref=e193]:
              - checkbox [ref=e195] [cursor=pointer]
            - cell "IPD/0004" [ref=e196] [cursor=pointer]
            - cell "Pat Shalz" [ref=e197] [cursor=pointer]
            - cell "test1" [ref=e198] [cursor=pointer]
            - cell [ref=e199] [cursor=pointer]
            - cell [ref=e200] [cursor=pointer]
            - cell "Jul 12, 1:27 PM" [ref=e201] [cursor=pointer]
            - cell [ref=e202] [cursor=pointer]
            - cell "1" [ref=e203] [cursor=pointer]
            - cell "0.00" [ref=e204] [cursor=pointer]
            - cell "0.00" [ref=e205] [cursor=pointer]
            - cell "0.00" [ref=e206] [cursor=pointer]
            - cell "Draft" [ref=e207] [cursor=pointer]:
              - generic [ref=e209]: Draft
            - cell [ref=e210]
          - row "IPD/0005 Pat Shalz test1 Jul 12, 1:27 PM 1 0.00 0.00 0.00 Draft" [ref=e211]:
            - cell [ref=e212]:
              - checkbox [ref=e214] [cursor=pointer]
            - cell "IPD/0005" [ref=e215] [cursor=pointer]
            - cell "Pat Shalz" [ref=e216] [cursor=pointer]
            - cell "test1" [ref=e217] [cursor=pointer]
            - cell [ref=e218] [cursor=pointer]
            - cell [ref=e219] [cursor=pointer]
            - cell "Jul 12, 1:27 PM" [ref=e220] [cursor=pointer]
            - cell [ref=e221] [cursor=pointer]
            - cell "1" [ref=e222] [cursor=pointer]
            - cell "0.00" [ref=e223] [cursor=pointer]
            - cell "0.00" [ref=e224] [cursor=pointer]
            - cell "0.00" [ref=e225] [cursor=pointer]
            - cell "Draft" [ref=e226] [cursor=pointer]:
              - generic [ref=e228]: Draft
            - cell [ref=e229]
          - row "IPD/0006 Pat Shalz test1 Jul 12, 1:28 PM 1 0.00 0.00 0.00 Draft" [ref=e230]:
            - cell [ref=e231]:
              - checkbox [ref=e233] [cursor=pointer]
            - cell "IPD/0006" [ref=e234] [cursor=pointer]
            - cell "Pat Shalz" [ref=e235] [cursor=pointer]
            - cell "test1" [ref=e236] [cursor=pointer]
            - cell [ref=e237] [cursor=pointer]
            - cell [ref=e238] [cursor=pointer]
            - cell "Jul 12, 1:28 PM" [ref=e239] [cursor=pointer]
            - cell [ref=e240] [cursor=pointer]
            - cell "1" [ref=e241] [cursor=pointer]
            - cell "0.00" [ref=e242] [cursor=pointer]
            - cell "0.00" [ref=e243] [cursor=pointer]
            - cell "0.00" [ref=e244] [cursor=pointer]
            - cell "Draft" [ref=e245] [cursor=pointer]:
              - generic [ref=e247]: Draft
            - cell [ref=e248]
          - row "IPD/0007 Pat Shalz test1 Jul 12, 1:28 PM 1 0.00 0.00 0.00 Draft" [ref=e249]:
            - cell [ref=e250]:
              - checkbox [ref=e252] [cursor=pointer]
            - cell "IPD/0007" [ref=e253] [cursor=pointer]
            - cell "Pat Shalz" [ref=e254] [cursor=pointer]
            - cell "test1" [ref=e255] [cursor=pointer]
            - cell [ref=e256] [cursor=pointer]
            - cell [ref=e257] [cursor=pointer]
            - cell "Jul 12, 1:28 PM" [ref=e258] [cursor=pointer]
            - cell [ref=e259] [cursor=pointer]
            - cell "1" [ref=e260] [cursor=pointer]
            - cell "0.00" [ref=e261] [cursor=pointer]
            - cell "0.00" [ref=e262] [cursor=pointer]
            - cell "0.00" [ref=e263] [cursor=pointer]
            - cell "Draft" [ref=e264] [cursor=pointer]:
              - generic [ref=e266]: Draft
            - cell [ref=e267]
          - row "IPD/0008 Pat Shalz test1 Jul 12, 1:30 PM 1 0.00 0.00 0.00 Draft" [ref=e268]:
            - cell [ref=e269]:
              - checkbox [ref=e271] [cursor=pointer]
            - cell "IPD/0008" [ref=e272] [cursor=pointer]
            - cell "Pat Shalz" [ref=e273] [cursor=pointer]
            - cell "test1" [ref=e274] [cursor=pointer]
            - cell [ref=e275] [cursor=pointer]
            - cell [ref=e276] [cursor=pointer]
            - cell "Jul 12, 1:30 PM" [ref=e277] [cursor=pointer]
            - cell [ref=e278] [cursor=pointer]
            - cell "1" [ref=e279] [cursor=pointer]
            - cell "0.00" [ref=e280] [cursor=pointer]
            - cell "0.00" [ref=e281] [cursor=pointer]
            - cell "0.00" [ref=e282] [cursor=pointer]
            - cell "Draft" [ref=e283] [cursor=pointer]:
              - generic [ref=e285]: Draft
            - cell [ref=e286]
          - row "IPD/0009 Pat Shalz test1 Jul 12, 1:30 PM 1 0.00 0.00 0.00 Draft" [ref=e287]:
            - cell [ref=e288]:
              - checkbox [ref=e290] [cursor=pointer]
            - cell "IPD/0009" [ref=e291] [cursor=pointer]
            - cell "Pat Shalz" [ref=e292] [cursor=pointer]
            - cell "test1" [ref=e293] [cursor=pointer]
            - cell [ref=e294] [cursor=pointer]
            - cell [ref=e295] [cursor=pointer]
            - cell "Jul 12, 1:30 PM" [ref=e296] [cursor=pointer]
            - cell [ref=e297] [cursor=pointer]
            - cell "1" [ref=e298] [cursor=pointer]
            - cell "0.00" [ref=e299] [cursor=pointer]
            - cell "0.00" [ref=e300] [cursor=pointer]
            - cell "0.00" [ref=e301] [cursor=pointer]
            - cell "Draft" [ref=e302] [cursor=pointer]:
              - generic [ref=e304]: Draft
            - cell [ref=e305]
        - rowgroup [ref=e306]:
          - row "500.00" [ref=e307]:
            - cell [ref=e308]
            - cell "500.00" [ref=e309]:
              - generic [ref=e310]: "500.00"
            - cell [ref=e311]
  - generic:
    - menu [ref=e312]:
      - 'menuitem "Search IPD Ref for: IPD/0008" [ref=e313] [cursor=pointer]':
        - 'link "Search IPD Ref for: IPD/0008" [ref=e314]':
          - /url: "#"
      - 'menuitem " Search Patient for: IPD/0008" [ref=e315] [cursor=pointer]':
        - link "" [ref=e316]:
          - /url: "#"
          - generic [ref=e317]: 
        - 'link "Search Patient for: IPD/0008" [ref=e318]':
          - /url: "#"
      - 'menuitem " Search Doctor Incharge for: IPD/0008" [ref=e319] [cursor=pointer]':
        - link "" [ref=e320]:
          - /url: "#"
          - generic [ref=e321]: 
        - 'link "Search Doctor Incharge for: IPD/0008" [ref=e322]':
          - /url: "#"
      - 'menuitem " Search Ward for: IPD/0008" [ref=e323] [cursor=pointer]':
        - link "" [ref=e324]:
          - /url: "#"
          - generic [ref=e325]: 
        - 'link "Search Ward for: IPD/0008" [ref=e326]':
          - /url: "#"
      - menuitem "Custom Filter..." [ref=e327] [cursor=pointer]:
        - link "Custom Filter..." [ref=e328]:
          - /url: "#"
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