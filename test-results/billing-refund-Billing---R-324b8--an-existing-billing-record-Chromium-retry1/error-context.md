# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: billing\refund.spec.ts >> Billing - Refund scenarios >> should display refund prerequisites on an existing billing record
- Location: tests\billing\refund.spec.ts:5:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Dashboard' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: 'Dashboard' })

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
              - generic [ref=e60]: ₹0
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
  1  | import { expect, type Page } from '@playwright/test';
  2  | import { LoginPage } from '../../LoginPage';
  3  | import { BillingPage } from '../../pages/BillingPage';
  4  | 
  5  | const USERNAME = 'team40';
  6  | const PASSWORD = 'vASPFtSh4d';
  7  | 
  8  | export async function loginAndOpenBilling(page: Page): Promise<BillingPage> {
  9  |   const loginPage = new LoginPage(page);
  10 |   const billingPage = new BillingPage(page);
  11 | 
  12 |   await loginPage.open();
  13 |   await loginPage.login(USERNAME, PASSWORD);
  14 | 
> 15 |   await expect(loginPage.getDashboardLink()).toBeVisible();
     |                                              ^ Error: expect(locator).toBeVisible() failed
  16 |   await billingPage.openList();
  17 | 
  18 |   return billingPage;
  19 | }
  20 | 
```