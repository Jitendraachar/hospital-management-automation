# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: billing.spec.ts >> Billing Module >> should open new billing form with mandatory controls
- Location: tests/billing.spec.ts:26:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('main form').first().getByRole('button', { name: /Log in/i }) to be visible

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
  1  | import { Locator, Page } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | import { getBaseUrl } from './helpers/env';
  4  | 
  5  | export class LoginPage extends BasePage {
  6  |     private readonly emailInput: Locator;
  7  |     private readonly passwordInput: Locator;
  8  |     private readonly loginButton: Locator;
  9  |     private readonly dashboardLink: Locator;
  10 |     private readonly hospitalOperationsHeading: Locator;
  11 |     private readonly moduleSearchInput: Locator;
  12 |     private readonly userStatusButton: Locator;
  13 | 
  14 |     constructor(page: Page) {
  15 |         super(page);
  16 | 
  17 |         const loginForm = page.locator('main form').first();
  18 | 
  19 |         this.emailInput = loginForm.getByPlaceholder('Enter your email');
  20 |         this.passwordInput = loginForm.getByPlaceholder('Enter your password');
  21 |         this.loginButton = loginForm.getByRole('button', { name: /Log in/i });
  22 | 
  23 |         this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
  24 |         this.hospitalOperationsHeading = page.getByRole('heading', { name: 'Hospital Operations' });
  25 |         this.moduleSearchInput = page.getByRole('textbox', { name: 'Search modules, features, tools...' });
  26 |         this.userStatusButton = page.getByRole('button', { name: 'User User is idle' });
  27 |     }
  28 | 
  29 |     async open(): Promise<void> {
  30 |         const loginUrl = new URL('/odoo', getBaseUrl()).toString();
  31 |         await this.navigate(loginUrl);
> 32 |         await this.loginButton.waitFor({ state: 'visible' });
     |                                ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  33 |     }
  34 | 
  35 |     async enterEmail(email: string): Promise<void> {
  36 |         await this.fill(this.emailInput, email);
  37 |     }
  38 | 
  39 |     async enterPassword(password: string): Promise<void> {
  40 |         await this.fill(this.passwordInput, password);
  41 |     }
  42 | 
  43 |     async submit(): Promise<void> {
  44 |         await this.click(this.loginButton);
  45 |     }
  46 | 
  47 |     async login(email: string, password: string): Promise<void> {
  48 |         await this.enterEmail(email);
  49 |         await this.enterPassword(password);
  50 |         await this.submit();
  51 |     }
  52 | 
  53 |     getEmailInput(): Locator {
  54 |         return this.emailInput;
  55 |     }
  56 | 
  57 |     getPasswordInput(): Locator {
  58 |         return this.passwordInput;
  59 |     }
  60 | 
  61 |     getLoginButton(): Locator {
  62 |         return this.loginButton;
  63 |     }
  64 | 
  65 |     getDashboardLink(): Locator {
  66 |         return this.dashboardLink;
  67 |     }
  68 | 
  69 |     getHospitalOperationsHeading(): Locator {
  70 |         return this.hospitalOperationsHeading;
  71 |     }
  72 | 
  73 |     getModuleSearchInput(): Locator {
  74 |         return this.moduleSearchInput;
  75 |     }
  76 | 
  77 |     getUserStatusButton(): Locator {
  78 |         return this.userStatusButton;
  79 |     }
  80 | }
  81 | 
```