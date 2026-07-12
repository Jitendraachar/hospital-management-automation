# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard\dashboard.spec.ts >> Dashboard Module >> should keep dashboard stable when module search receives special payload
- Location: tests\dashboard\dashboard.spec.ts:89:9

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
    - form [ref=e50]:
      - generic [ref=e51]:
        - generic [ref=e52]: Email
        - textbox "Email" [ref=e53]:
          - /placeholder: Enter your email
          - text: team40
      - generic [ref=e54]:
        - generic [ref=e55]:
          - generic [ref=e56]: Password
          - link "Reset Password" [ref=e57] [cursor=pointer]:
            - /url: /web/reset_password?redirect=%2Fodoo%2Faction-372%3F
        - generic [ref=e58]:
          - textbox "Password" [ref=e59]:
            - /placeholder: Enter your password
            - text: vASPFtSh4d
          - button "" [ref=e60] [cursor=pointer]:
            - generic [ref=e61]: 
      - generic [ref=e62]:
        - button "Log in" [ref=e63] [cursor=pointer]
        - generic [ref=e64]:
          - emphasis [ref=e65]: "- or -"
          - link " Use a Passkey" [ref=e67] [cursor=pointer]:
            - /url: "#"
            - text: 
            - generic [ref=e68]: Use a Passkey
  - contentinfo [ref=e69]:
    - generic [ref=e72]:
      - generic [ref=e73]:
        - link "Shivansh Cancer Center Shivansh Cancer Center" [ref=e74] [cursor=pointer]:
          - /url: /
          - img "Shivansh Cancer Center" [ref=e75]
          - generic [ref=e76]:
            - generic [ref=e77]: Shivansh
            - generic [ref=e78]: Cancer Center
        - paragraph [ref=e79]: Example State's most trusted cancer treatment centre offering comprehensive oncology services — from early diagnosis to advanced surgery and radiation therapy — in Example City.
        - generic [ref=e80]:
          - generic [ref=e81]: NABH Accredited
          - generic [ref=e82]: ISO Certified
          - generic [ref=e83]: 24/7 Emergency
        - generic [ref=e84]:
          - link "Facebook" [ref=e85] [cursor=pointer]:
            - /url: "#"
            - img [ref=e86]
          - link "YouTube" [ref=e88] [cursor=pointer]:
            - /url: "#"
            - img [ref=e89]
          - link "WhatsApp" [ref=e92] [cursor=pointer]:
            - /url: https://wa.me/911234567890
            - img [ref=e93]
          - link "Instagram" [ref=e95] [cursor=pointer]:
            - /url: "#"
            - img [ref=e96]
      - generic [ref=e100]:
        - generic [ref=e101]: Quick Links
        - generic [ref=e102]:
          - link "Home" [ref=e103] [cursor=pointer]:
            - /url: /
            - img [ref=e104]
            - text: Home
          - link "Our Specialists" [ref=e106] [cursor=pointer]:
            - /url: /doctor/list
            - img [ref=e107]
            - text: Our Specialists
          - link "Book Appointment" [ref=e109] [cursor=pointer]:
            - /url: /health_plix/book
            - img [ref=e110]
            - text: Book Appointment
          - link "About Us" [ref=e112] [cursor=pointer]:
            - /url: "#"
            - img [ref=e113]
            - text: About Us
          - link "Patient Stories" [ref=e115] [cursor=pointer]:
            - /url: "#"
            - img [ref=e116]
            - text: Patient Stories
          - link "Free Second Opinion" [ref=e118] [cursor=pointer]:
            - /url: "#"
            - img [ref=e119]
            - text: Free Second Opinion
          - link "Contact Us" [ref=e121] [cursor=pointer]:
            - /url: "#"
            - img [ref=e122]
            - text: Contact Us
      - generic [ref=e124]:
        - generic [ref=e125]: Treatments
        - generic [ref=e126]:
          - link "Surgical Oncology" [ref=e127] [cursor=pointer]:
            - /url: "#"
            - img [ref=e128]
            - text: Surgical Oncology
          - link "Radiation Therapy" [ref=e130] [cursor=pointer]:
            - /url: "#"
            - img [ref=e131]
            - text: Radiation Therapy
          - link "Chemotherapy" [ref=e133] [cursor=pointer]:
            - /url: "#"
            - img [ref=e134]
            - text: Chemotherapy
          - link "Medical Oncology" [ref=e136] [cursor=pointer]:
            - /url: "#"
            - img [ref=e137]
            - text: Medical Oncology
          - link "Immunotherapy" [ref=e139] [cursor=pointer]:
            - /url: "#"
            - img [ref=e140]
            - text: Immunotherapy
          - link "Palliative Care" [ref=e142] [cursor=pointer]:
            - /url: "#"
            - img [ref=e143]
            - text: Palliative Care
          - link "Advanced Diagnostics" [ref=e145] [cursor=pointer]:
            - /url: "#"
            - img [ref=e146]
            - text: Advanced Diagnostics
      - generic [ref=e148]:
        - generic [ref=e149]: Contact & Location
        - generic [ref=e150]:
          - img [ref=e152]
          - generic [ref=e154]:
            - generic [ref=e155]: Address
            - generic [ref=e156]:
              - text: Shivansh Cancer Center
              - text: 123 Example Street, Example City
              - text: Example State – 000000
        - generic [ref=e157]:
          - img [ref=e159]
          - generic [ref=e161]:
            - generic [ref=e162]: Helpline
            - link "+91 12345 67890" [ref=e163] [cursor=pointer]:
              - /url: tel:+911234567890
        - generic [ref=e164]:
          - img [ref=e166]
          - generic [ref=e168]:
            - generic [ref=e169]: Email
            - link "info@example.com" [ref=e170] [cursor=pointer]:
              - /url: mailto:info@example.com
        - generic [ref=e171]:
          - generic [ref=e172]: OPD Timings
          - generic [ref=e173]:
            - generic [ref=e174]: Monday – Saturday
            - generic [ref=e175]: 9:00 am – 6:00 pm
          - generic [ref=e176]:
            - generic [ref=e177]: Sunday
            - generic [ref=e178]: 10:00 am – 2:00 pm
          - generic [ref=e179]:
            - generic [ref=e180]: Emergency
            - generic [ref=e181]: 24 × 7
    - generic [ref=e185]:
      - paragraph [ref=e187]: © 2025 Shivansh Cancer Center, Example City, Example State. All Rights Reserved. | Best Cancer Hospital in Example City | Best Cancer Surgeon in Example City | Best Oncologist in Example State
      - generic [ref=e189]:
        - link "Privacy Policy" [ref=e190] [cursor=pointer]:
          - /url: "#"
        - link "Terms of Use" [ref=e191] [cursor=pointer]:
          - /url: "#"
        - link "Disclaimer" [ref=e192] [cursor=pointer]:
          - /url: "#"
        - link "Sitemap" [ref=e193] [cursor=pointer]:
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
> 64  |         await page.waitForURL(/\/odoo(\/action-\d+(\/action-\d+)?)?/, { timeout: 15000 });
      |                    ^ TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
  65  | 
  66  |         if (page.url().includes('/web/login')) {
  67  |             throw new Error('Authentication did not complete successfully for Dashboard tests.');
  68  |         }
  69  |     };
  70  | 
  71  |     test.afterEach(async ({ page }, testInfo) => {
  72  |         await captureFailureScreenshot(page, testInfo);
  73  |     });
  74  | 
  75  |     test('should load dashboard KPIs and quick access section', async ({ page }) => {
  76  |         const dashboardPage = new DashboardPage(page);
  77  | 
  78  |         await ensureDashboardSession(page);
  79  |         await dashboardPage.open();
  80  |         await dashboardPage.expectDashboardLoaded();
  81  | 
  82  |         await expect(dashboardPage.getKpiLabel('Total Patients')).toBeVisible();
  83  |         await expect(dashboardPage.getKpiLabel('OPD Appointments')).toBeVisible();
  84  |         await expect(dashboardPage.getKpiLabel('Pending Lab Tests')).toBeVisible();
  85  |         await expect(dashboardPage.getKpiLabel('Paid Revenue')).toBeVisible();
  86  |         await expect(dashboardPage.getKpiLabel('Active Doctors')).toBeVisible();
  87  |     });
  88  | 
  89  |     test('should keep dashboard stable when module search receives special payload', async ({ page }) => {
  90  |         const dashboardPage = new DashboardPage(page);
  91  |         const payload = `' OR '1'='1`;
  92  | 
  93  |         await ensureDashboardSession(page);
  94  |         await dashboardPage.open();
  95  |         await dashboardPage.expectDashboardLoaded();
  96  | 
  97  |         await dashboardPage.searchModule(payload);
  98  | 
  99  |         await expect(dashboardPage.getModuleSearchInput()).toHaveValue(payload);
  100 |         await expect(page).toHaveURL(/\/odoo\/action-372(?:$|\/?)/);
  101 |         await expect(dashboardPage.getQuickAccessHeading()).toBeVisible();
  102 |     });
  103 | 
  104 |     test('should navigate to core modules from top navigation links', async ({ page }) => {
  105 |         const dashboardPage = new DashboardPage(page);
  106 | 
  107 |         await ensureDashboardSession(page);
  108 | 
  109 |         const topNavExpectations: Array<{ module: 'Patients' | 'Doctors' | 'Prescriptions' | 'Appointments' | 'Billings'; url: RegExp }> = [
  110 |             { module: 'Patients', url: /action-372\/action-374/ },
  111 |             { module: 'Doctors', url: /action-372\/action-375/ },
  112 |             { module: 'Prescriptions', url: /action-372\/action-377/ },
  113 |             { module: 'Appointments', url: /action-372\/action-376/ },
  114 |             { module: 'Billings', url: /\/odoo\/action-383/ }
  115 |         ];
  116 | 
  117 |         for (const item of topNavExpectations) {
  118 |             await dashboardPage.open();
  119 |             await dashboardPage.expectDashboardLoaded();
  120 | 
  121 |             await dashboardPage.clickTopNav(item.module);
  122 | 
  123 |             await expect(page).toHaveURL(item.url);
  124 |             await expect(page.getByRole('searchbox', { name: 'Search...' })).toBeVisible();
  125 |         }
  126 |     });
  127 | 
  128 |     test('should navigate to core modules from quick access cards', async ({ page }) => {
  129 |         const dashboardPage = new DashboardPage(page);
  130 | 
  131 |         await ensureDashboardSession(page);
  132 | 
  133 |         const quickAccessExpectations: Array<{
  134 |             module: 'Patients' | 'Doctors' | 'Prescriptions' | 'Appointments' | 'Billing';
  135 |             url: RegExp;
  136 |         }> = [
  137 |             { module: 'Patients', url: /action-372\/action-374/ },
  138 |             { module: 'Doctors', url: /action-372\/action-375/ },
  139 |             { module: 'Prescriptions', url: /action-372\/action-377/ },
  140 |             { module: 'Appointments', url: /action-372\/action-376/ },
  141 |             { module: 'Billing', url: /\/odoo\/action-383/ }
  142 |         ];
  143 | 
  144 |         for (const item of quickAccessExpectations) {
  145 |             await dashboardPage.open();
  146 |             await dashboardPage.expectDashboardLoaded();
  147 | 
  148 |             await dashboardPage.clickQuickAccess(item.module);
  149 | 
  150 |             await expect(page).toHaveURL(item.url);
  151 |             await expect(page.getByRole('searchbox', { name: 'Search...' })).toBeVisible();
  152 |         }
  153 |     });
  154 | });
  155 | 
```