# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard\dashboard.spec.ts >> Dashboard Module >> should navigate to core modules from quick access cards
- Location: tests\dashboard\dashboard.spec.ts:128:9

# Error details

```
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - link "Skip to Content" [ref=e3] [cursor=pointer]:
    - /url: "#wrap"
  - banner [ref=e4]:
    - generic [ref=e7]:
      - generic [ref=e8]:
        - link "+91 12345 67890" [ref=e9] [cursor=pointer]:
          - /url: tel:+911234567890
          - img [ref=e10]
          - text: +91 12345 67890
        - generic [ref=e12]: "|"
        - link "info@example.com" [ref=e13] [cursor=pointer]:
          - /url: mailto:info@example.com
          - img [ref=e14]
          - text: info@example.com
        - generic [ref=e16]: "|"
        - link "WhatsApp" [ref=e17] [cursor=pointer]:
          - /url: https://wa.me/911234567890
          - img [ref=e18]
          - text: WhatsApp
      - generic [ref=e20]:
        - generic [ref=e21]: "OPD: Mon–Sat 9am–6pm · Sun 10am–2pm"
        - generic [ref=e22]: ●24/7 Emergency
    - navigation [ref=e24]:
      - link "Shivansh Cancer Center Logo Shivansh Cancer Center" [ref=e25] [cursor=pointer]:
        - /url: /
        - img "Shivansh Cancer Center Logo" [ref=e26]
        - generic [ref=e27]:
          - generic [ref=e28]: Shivansh
          - generic [ref=e29]: Cancer Center
      - generic [ref=e30]:
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Home" [ref=e33] [cursor=pointer]:
              - /url: /
          - listitem [ref=e34]:
            - link "Treatments" [ref=e35] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e36]:
            - link "Our Doctors" [ref=e37] [cursor=pointer]:
              - /url: /doctor/list
          - listitem [ref=e38]:
            - link "About Us" [ref=e39] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e40]:
            - link "Contact" [ref=e41] [cursor=pointer]:
              - /url: "#"
        - generic [ref=e42]:
          - link "Free Second Opinion" [ref=e43] [cursor=pointer]:
            - /url: "#"
          - link "Book Appointment" [ref=e44] [cursor=pointer]:
            - /url: /health_plix/book
            - img [ref=e45]
            - text: Book Appointment
  - main [ref=e48]:
    - generic:  
  - contentinfo [ref=e49]:
    - generic [ref=e52]:
      - generic [ref=e53]:
        - link "Shivansh Cancer Center Shivansh Cancer Center" [ref=e54] [cursor=pointer]:
          - /url: /
          - img "Shivansh Cancer Center" [ref=e55]
          - generic [ref=e56]:
            - generic [ref=e57]: Shivansh
            - generic [ref=e58]: Cancer Center
        - paragraph [ref=e59]: Example State's most trusted cancer treatment centre offering comprehensive oncology services — from early diagnosis to advanced surgery and radiation therapy — in Example City.
        - generic [ref=e60]:
          - generic [ref=e61]: NABH Accredited
          - generic [ref=e62]: ISO Certified
          - generic [ref=e63]: 24/7 Emergency
        - generic [ref=e64]:
          - link "Facebook" [ref=e65] [cursor=pointer]:
            - /url: "#"
            - img [ref=e66]
          - link "YouTube" [ref=e68] [cursor=pointer]:
            - /url: "#"
            - img [ref=e69]
          - link "WhatsApp" [ref=e72] [cursor=pointer]:
            - /url: https://wa.me/911234567890
            - img [ref=e73]
          - link "Instagram" [ref=e75] [cursor=pointer]:
            - /url: "#"
            - img [ref=e76]
      - generic [ref=e80]:
        - generic [ref=e81]: Quick Links
        - generic [ref=e82]:
          - link "Home" [ref=e83] [cursor=pointer]:
            - /url: /
            - img [ref=e84]
            - text: Home
          - link "Our Specialists" [ref=e86] [cursor=pointer]:
            - /url: /doctor/list
            - img [ref=e87]
            - text: Our Specialists
          - link "Book Appointment" [ref=e89] [cursor=pointer]:
            - /url: /health_plix/book
            - img [ref=e90]
            - text: Book Appointment
          - link "About Us" [ref=e92] [cursor=pointer]:
            - /url: "#"
            - img [ref=e93]
            - text: About Us
          - link "Patient Stories" [ref=e95] [cursor=pointer]:
            - /url: "#"
            - img [ref=e96]
            - text: Patient Stories
          - link "Free Second Opinion" [ref=e98] [cursor=pointer]:
            - /url: "#"
            - img [ref=e99]
            - text: Free Second Opinion
          - link "Contact Us" [ref=e101] [cursor=pointer]:
            - /url: "#"
            - img [ref=e102]
            - text: Contact Us
      - generic [ref=e104]:
        - generic [ref=e105]: Treatments
        - generic [ref=e106]:
          - link "Surgical Oncology" [ref=e107] [cursor=pointer]:
            - /url: "#"
            - img [ref=e108]
            - text: Surgical Oncology
          - link "Radiation Therapy" [ref=e110] [cursor=pointer]:
            - /url: "#"
            - img [ref=e111]
            - text: Radiation Therapy
          - link "Chemotherapy" [ref=e113] [cursor=pointer]:
            - /url: "#"
            - img [ref=e114]
            - text: Chemotherapy
          - link "Medical Oncology" [ref=e116] [cursor=pointer]:
            - /url: "#"
            - img [ref=e117]
            - text: Medical Oncology
          - link "Immunotherapy" [ref=e119] [cursor=pointer]:
            - /url: "#"
            - img [ref=e120]
            - text: Immunotherapy
          - link "Palliative Care" [ref=e122] [cursor=pointer]:
            - /url: "#"
            - img [ref=e123]
            - text: Palliative Care
          - link "Advanced Diagnostics" [ref=e125] [cursor=pointer]:
            - /url: "#"
            - img [ref=e126]
            - text: Advanced Diagnostics
      - generic [ref=e128]:
        - generic [ref=e129]: Contact & Location
        - generic [ref=e130]:
          - img [ref=e132]
          - generic [ref=e134]:
            - generic [ref=e135]: Address
            - generic [ref=e136]:
              - text: Shivansh Cancer Center
              - text: 123 Example Street, Example City
              - text: Example State – 000000
        - generic [ref=e137]:
          - img [ref=e139]
          - generic [ref=e141]:
            - generic [ref=e142]: Helpline
            - link "+91 12345 67890" [ref=e143] [cursor=pointer]:
              - /url: tel:+911234567890
        - generic [ref=e144]:
          - img [ref=e146]
          - generic [ref=e148]:
            - generic [ref=e149]: Email
            - link "info@example.com" [ref=e150] [cursor=pointer]:
              - /url: mailto:info@example.com
        - generic [ref=e151]:
          - generic [ref=e152]: OPD Timings
          - generic [ref=e153]:
            - generic [ref=e154]: Monday – Saturday
            - generic [ref=e155]: 9:00 am – 6:00 pm
          - generic [ref=e156]:
            - generic [ref=e157]: Sunday
            - generic [ref=e158]: 10:00 am – 2:00 pm
          - generic [ref=e159]:
            - generic [ref=e160]: Emergency
            - generic [ref=e161]: 24 × 7
    - generic [ref=e165]:
      - paragraph [ref=e167]: © 2025 Shivansh Cancer Center, Example City, Example State. All Rights Reserved. | Best Cancer Hospital in Example City | Best Cancer Surgeon in Example City | Best Oncologist in Example State
      - generic [ref=e169]:
        - link "Privacy Policy" [ref=e170] [cursor=pointer]:
          - /url: "#"
        - link "Terms of Use" [ref=e171] [cursor=pointer]:
          - /url: "#"
        - link "Disclaimer" [ref=e172] [cursor=pointer]:
          - /url: "#"
        - link "Sitemap" [ref=e173] [cursor=pointer]:
          - /url: "#"
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test';
  2   | import { getLoginCredentials } from '../../helpers/env';
  3   | import { captureFailureScreenshot } from '../../helpers/testHooks';
  4   | import { DashboardPage } from '../../pages/dashboard/DashboardPage';
  5   | 
  6   | test.describe('Dashboard Module', () => {
  7   |     const ensureDashboardSession = async (page: import('@playwright/test').Page): Promise<void> => {
  8   |         await page.goto('https://team40.qaaerp.com/odoo/action-372');
  9   | 
  10  |         if (page.url().includes('/web/login')) {
  11  |             const { username, password } = getLoginCredentials();
  12  | 
  13  |             const loginInput = page.locator('input[name="login"]').first();
  14  |             const passwordInput = page.locator('input[name="password"]').first();
  15  | 
  16  |             await loginInput.waitFor({ state: 'attached' });
  17  |             await passwordInput.waitFor({ state: 'attached' });
  18  | 
  19  |             const submitted = await page.evaluate(
  20  |                 ({ user, pass }) => {
  21  |                     const doc = (globalThis as any).document;
  22  |                     const login = doc?.querySelector('input[name="login"]');
  23  |                     const password = doc?.querySelector('input[name="password"]');
  24  | 
  25  |                     if (!login || !password) {
  26  |                         return false;
  27  |                     }
  28  | 
  29  |                     login.value = user;
  30  |                     login.dispatchEvent(new Event('input', { bubbles: true }));
  31  |                     login.dispatchEvent(new Event('change', { bubbles: true }));
  32  | 
  33  |                     password.value = pass;
  34  |                     password.dispatchEvent(new Event('input', { bubbles: true }));
  35  |                     password.dispatchEvent(new Event('change', { bubbles: true }));
  36  | 
  37  |                     const form = login.closest('form');
  38  |                     if (form) {
  39  |                         if (typeof form.requestSubmit === 'function') {
  40  |                             form.requestSubmit();
  41  |                         } else {
  42  |                             form.submit();
  43  |                         }
  44  | 
  45  |                         return true;
  46  |                     }
  47  | 
  48  |                     const submitButton = doc?.querySelector('button[type="submit"]');
  49  |                     if (submitButton) {
  50  |                         submitButton.click();
  51  |                         return true;
  52  |                     }
  53  | 
  54  |                     return false;
  55  |                 },
  56  |                 { user: username, pass: password }
  57  |             );
  58  | 
  59  |             if (!submitted) {
  60  |                 throw new Error('Dashboard login form controls were not available for authentication.');
  61  |             }
  62  |         }
  63  | 
> 64  |         await expect
      |                    ^ TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
  65  |             .poll(() => page.url(), { timeout: 20000 })
  66  |             .not.toContain('/web/login');
  67  | 
  68  |         if (page.url().includes('/web/login')) {
  69  |             throw new Error('Authentication did not complete successfully for Dashboard tests.');
  70  |         }
  71  |     };
  72  | 
  73  |     test.afterEach(async ({ page }, testInfo) => {
  74  |         await captureFailureScreenshot(page, testInfo);
  75  |     });
  76  | 
  77  |     test('should load dashboard KPIs and quick access section', async ({ page }) => {
  78  |         const dashboardPage = new DashboardPage(page);
  79  | 
  80  |         await ensureDashboardSession(page);
  81  |         await dashboardPage.open();
  82  |         await dashboardPage.expectDashboardLoaded();
  83  | 
  84  |         await expect(dashboardPage.getKpiLabel('Total Patients')).toBeVisible();
  85  |         await expect(dashboardPage.getKpiLabel('OPD Appointments')).toBeVisible();
  86  |         await expect(dashboardPage.getKpiLabel('Pending Lab Tests')).toBeVisible();
  87  |         await expect(dashboardPage.getKpiLabel('Paid Revenue')).toBeVisible();
  88  |         await expect(dashboardPage.getKpiLabel('Active Doctors')).toBeVisible();
  89  |     });
  90  | 
  91  |     test('should keep dashboard stable when module search receives special payload', async ({ page }) => {
  92  |         const dashboardPage = new DashboardPage(page);
  93  |         const payload = `' OR '1'='1`;
  94  | 
  95  |         await ensureDashboardSession(page);
  96  |         await dashboardPage.open();
  97  |         await dashboardPage.expectDashboardLoaded();
  98  | 
  99  |         await dashboardPage.searchModule(payload);
  100 | 
  101 |         await expect(dashboardPage.getModuleSearchInput()).toHaveValue(payload);
  102 |         await expect(page).toHaveURL(/\/odoo\/action-372(?:$|\/?)/);
  103 |         await expect(dashboardPage.getQuickAccessHeading()).toBeVisible();
  104 |     });
  105 | 
  106 |     test('should navigate to core modules from top navigation links', async ({ page }) => {
  107 |         const dashboardPage = new DashboardPage(page);
  108 | 
  109 |         await ensureDashboardSession(page);
  110 | 
  111 |         const topNavExpectations: Array<{ module: 'Patients' | 'Doctors' | 'Prescriptions' | 'Appointments' | 'Billings'; url: RegExp }> = [
  112 |             { module: 'Patients', url: /action-372\/action-374/ },
  113 |             { module: 'Doctors', url: /action-372\/action-375/ },
  114 |             { module: 'Prescriptions', url: /action-372\/action-377/ },
  115 |             { module: 'Appointments', url: /action-372\/action-376/ },
  116 |             { module: 'Billings', url: /\/odoo\/action-383/ }
  117 |         ];
  118 | 
  119 |         for (const item of topNavExpectations) {
  120 |             await dashboardPage.open();
  121 |             await dashboardPage.expectDashboardLoaded();
  122 | 
  123 |             await dashboardPage.clickTopNav(item.module);
  124 | 
  125 |             await expect(page).toHaveURL(item.url);
  126 |             await expect(page.getByRole('searchbox', { name: 'Search...' })).toBeVisible();
  127 |         }
  128 |     });
  129 | 
  130 |     test('should navigate to core modules from quick access cards', async ({ page }) => {
  131 |         const dashboardPage = new DashboardPage(page);
  132 | 
  133 |         await ensureDashboardSession(page);
  134 | 
  135 |         const quickAccessExpectations: Array<{
  136 |             module: 'Patients' | 'Doctors' | 'Prescriptions' | 'Appointments' | 'Billing';
  137 |             url: RegExp;
  138 |         }> = [
  139 |             { module: 'Patients', url: /action-372\/action-374/ },
  140 |             { module: 'Doctors', url: /action-372\/action-375/ },
  141 |             { module: 'Prescriptions', url: /action-372\/action-377/ },
  142 |             { module: 'Appointments', url: /action-372\/action-376/ },
  143 |             { module: 'Billing', url: /\/odoo\/action-383/ }
  144 |         ];
  145 | 
  146 |         for (const item of quickAccessExpectations) {
  147 |             await dashboardPage.open();
  148 |             await dashboardPage.expectDashboardLoaded();
  149 | 
  150 |             await dashboardPage.clickQuickAccess(item.module);
  151 | 
  152 |             await expect(page).toHaveURL(item.url);
  153 |             await expect(page.getByRole('searchbox', { name: 'Search...' })).toBeVisible();
  154 |         }
  155 |     });
  156 | });
  157 | 
```