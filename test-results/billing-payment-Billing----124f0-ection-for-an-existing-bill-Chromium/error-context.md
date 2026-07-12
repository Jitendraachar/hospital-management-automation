# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: billing\payment.spec.ts >> Billing - Payment scenarios >> should display payment summary section for an existing bill
- Location: tests\billing\payment.spec.ts:5:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Create Invoice' })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('button', { name: 'Create Invoice' })

```

```yaml
- banner:
  - navigation:
    - button ""
    - menuitem "Shivansh"
    - menu:
      - menuitem "Dashboard"
      - button "Patients"
      - button "Doctors"
      - button "Management"
    - menu:
      - button "My Company" [disabled]
      - button "User User is idle":
        - img "User"
        - img "User is idle": 
- button " Back to Billing"
- button "New"
- list:
  - listitem:
    - link "Dashboard":
      - /url: /odoo/action-372
  - listitem:
    - text: /
    - link "Billing":
      - /url: /odoo/action-372/action-383
- text: BILL/00001
- button "Actions menu": 
- search:
  - navigation "Pager":
    - text: 1 / 5
    - button "Previous": 
    - button "Next": 
- main:
  - button "🖨 Print Invoice"
  - radiogroup "Statusbar":
    - radio "Paid" [disabled]
    - radio "Partially Paid" [disabled]
    - radio "Invoiced" [checked] [disabled]
    - radio "Draft" [disabled]
  - text: Billing Info Bill Number BILL/00001 Patient
  - combobox "Patient": atr
  - text: IPD Reference
  - combobox "IPD Reference"
  - text: Summary Invoice
  - link "Draft Invoice":
    - /url: /odoo/account.move/6
  - text: Invoice Total 34.50 Amount Paid 0.00 Amount Due 34.50 Total Amount 30.00
  - list:
    - listitem:
      - tab "Billing Lines"
    - listitem:
      - tab "Notes"
  - table:
    - rowgroup:
      - row "Line Type  Service / Medicine  Description / Item  Quantity  Unit Price  Subtotal  ":
        - columnheader "Line Type "
        - columnheader "Service / Medicine "
        - columnheader "Description / Item "
        - columnheader "Quantity "
        - columnheader "Unit Price "
        - columnheader "Subtotal "
        - columnheader "":
          - button ""
    - rowgroup:
      - row "Service / Product Testing Updated Service Line 2.00 15.00 30.00 Delete row":
        - cell "Service / Product"
        - cell "Testing"
        - cell "Updated Service Line"
        - cell "2.00"
        - cell "15.00"
        - cell "30.00"
        - cell "Delete row":
          - button "Delete row": 
      - row "Add a line":
        - cell "Add a line":
          - button "Add a line"
      - row:
        - cell
      - row:
        - cell
    - rowgroup:
      - row:
        - cell
        - cell
  - text: 🔵 Lab | 🟡 IPD/Bed | 🟢 Medicine | 🔷 Service/Product | ⬜ Custom/Manual — You can freely edit any line or add new rows manually.
- paragraph: Press esc to exit full screen
```

# Test source

```ts
  1   | import { Locator, Page, expect } from '@playwright/test';
  2   | import { BasePage } from '../BasePage';
  3   | import { getBaseUrl } from '../helpers/env';
  4   | 
  5   | export class BillingPage extends BasePage {
  6   |   private readonly newButton: Locator;
  7   |   private readonly searchInput: Locator;
  8   |   private readonly saveButton: Locator;
  9   |   private readonly discardButton: Locator;
  10  | 
  11  |   private readonly createInvoiceButton: Locator;
  12  |   private readonly reloadFromPatientButton: Locator;
  13  |   private readonly printInvoiceButton: Locator;
  14  | 
  15  |   private readonly patientCombobox: Locator;
  16  |   private readonly ipdReferenceCombobox: Locator;
  17  |   private readonly addLineButton: Locator;
  18  | 
  19  |   private readonly billNumberHeader: Locator;
  20  |   private readonly patientHeader: Locator;
  21  |   private readonly totalAmountHeader: Locator;
  22  |   private readonly statusHeader: Locator;
  23  | 
  24  |   private readonly firstBillCell: Locator;
  25  |   private readonly statusBar: Locator;
  26  |   private readonly invoiceTotalLabel: Locator;
  27  |   private readonly amountPaidLabel: Locator;
  28  |   private readonly amountDueLabel: Locator;
  29  |   private readonly totalAmountLabel: Locator;
  30  |   private readonly billingLinesTab: Locator;
  31  |   private readonly notesTab: Locator;
  32  |   private readonly billingListTitle: Locator;
  33  |   private readonly billingFormTitle: Locator;
  34  | 
  35  |   constructor(page: Page) {
  36  |     super(page);
  37  | 
  38  |     this.newButton = page.getByRole('button', { name: 'New' }).first();
  39  |     this.searchInput = page.getByRole('searchbox', { name: 'Search...' });
  40  |     this.saveButton = page.getByRole('button', { name: 'Save manually' });
  41  |     this.discardButton = page.getByRole('button', { name: 'Discard all changes' });
  42  | 
  43  |     this.createInvoiceButton = page.getByRole('button', { name: 'Create Invoice' });
  44  |     this.reloadFromPatientButton = page.getByRole('button', { name: '↻ Reload from Patient' });
  45  |     this.printInvoiceButton = page.getByRole('button', { name: '🖨 Print Invoice' });
  46  | 
  47  |     this.patientCombobox = page.getByRole('combobox', { name: 'Patient' });
  48  |     this.ipdReferenceCombobox = page.getByRole('combobox', { name: 'IPD Reference' });
  49  |     this.addLineButton = page.getByRole('button', { name: 'Add a line' });
  50  | 
  51  |     this.billNumberHeader = page.getByRole('columnheader', { name: /Bill Number/i });
  52  |     this.patientHeader = page.getByRole('columnheader', { name: /^Patient/ });
  53  |     this.totalAmountHeader = page.getByRole('columnheader', { name: /Total Amount/i });
  54  |     this.statusHeader = page.getByRole('columnheader', { name: /^Status/ });
  55  | 
  56  |     this.firstBillCell = page.getByRole('cell', { name: /^BILL\// }).first();
  57  |     this.statusBar = page.getByRole('radiogroup', { name: /Statusbar/i });
  58  |     this.invoiceTotalLabel = page.getByText('Invoice Total', { exact: true });
  59  |     this.amountPaidLabel = page.getByText('Amount Paid', { exact: true });
  60  |     this.amountDueLabel = page.getByText('Amount Due', { exact: true });
  61  |     this.totalAmountLabel = page.getByText('Total Amount', { exact: true });
  62  |     this.billingLinesTab = page.getByRole('tab', { name: 'Billing Lines' });
  63  |     this.notesTab = page.getByRole('tab', { name: 'Notes' });
  64  |     this.billingListTitle = page.getByText(/^Billing$/).first();
  65  |     this.billingFormTitle = page.getByText(/^New$/).first();
  66  |   }
  67  | 
  68  |   async openList(): Promise<void> {
  69  |     const url = new URL('/odoo/action-372/action-383', getBaseUrl()).toString();
  70  |     await this.navigate(url);
  71  |     await this.ensureBillingListLoaded();
  72  |   }
  73  | 
  74  |   async openNewForm(): Promise<void> {
  75  |     const url = new URL('/odoo/action-372/action-383/new', getBaseUrl()).toString();
  76  |     await this.navigate(url);
  77  |     await this.ensureBillingFormLoaded();
  78  |   }
  79  | 
  80  |   async ensureBillingListLoaded(): Promise<void> {
  81  |     await expect(this.newButton).toBeVisible({ timeout: 15000 });
  82  |     await expect(this.billNumberHeader).toBeVisible();
  83  |     await expect(this.patientHeader).toBeVisible();
  84  |     await expect(this.totalAmountHeader).toBeVisible();
  85  |     await expect(this.statusHeader).toBeVisible();
  86  |   }
  87  | 
  88  |   async ensureBillingFormLoaded(): Promise<void> {
> 89  |     await expect(this.createInvoiceButton).toBeVisible({ timeout: 15000 });
      |                                            ^ Error: expect(locator).toBeVisible() failed
  90  |     await expect(this.patientCombobox).toBeVisible();
  91  |     await expect(this.billingLinesTab).toBeVisible();
  92  |   }
  93  | 
  94  |   async clickNew(): Promise<void> {
  95  |     await this.click(this.newButton);
  96  |     await this.ensureBillingFormLoaded();
  97  |   }
  98  | 
  99  |   async search(term: string): Promise<void> {
  100 |     await this.fill(this.searchInput, term);
  101 |     await this.page.keyboard.press('Enter');
  102 |   }
  103 | 
  104 |   async openFirstBillFromList(): Promise<void> {
  105 |     await expect(this.firstBillCell).toBeVisible();
  106 |     await this.click(this.firstBillCell);
  107 |     await this.ensureBillingFormLoaded();
  108 |   }
  109 | 
  110 |   async openBillByNumber(billNumber: string): Promise<void> {
  111 |     const billCell = this.page.getByRole('cell', { name: new RegExp(`^${billNumber}$`, 'i') });
  112 |     await expect(billCell).toBeVisible();
  113 |     await this.click(billCell);
  114 |     await this.ensureBillingFormLoaded();
  115 |   }
  116 | 
  117 |   async selectPatient(patientName: string): Promise<void> {
  118 |     await this.click(this.patientCombobox);
  119 |     await this.fill(this.patientCombobox, patientName);
  120 |     await this.page.keyboard.press('Enter');
  121 |   }
  122 | 
  123 |   async selectIpdReference(reference: string): Promise<void> {
  124 |     await this.click(this.ipdReferenceCombobox);
  125 |     await this.fill(this.ipdReferenceCombobox, reference);
  126 |     await this.page.keyboard.press('Enter');
  127 |   }
  128 | 
  129 |   async addBillingLine(): Promise<void> {
  130 |     await this.click(this.addLineButton);
  131 |   }
  132 | 
  133 |   async clickCreateInvoice(): Promise<void> {
  134 |     await this.click(this.createInvoiceButton);
  135 |   }
  136 | 
  137 |   async save(): Promise<void> {
  138 |     await this.click(this.saveButton);
  139 |   }
  140 | 
  141 |   async discard(): Promise<void> {
  142 |     await this.click(this.discardButton);
  143 |   }
  144 | 
  145 |   async verifySummarySection(): Promise<void> {
  146 |     await expect(this.invoiceTotalLabel).toBeVisible();
  147 |     await expect(this.amountPaidLabel).toBeVisible();
  148 |     await expect(this.amountDueLabel).toBeVisible();
  149 |     await expect(this.totalAmountLabel).toBeVisible();
  150 |   }
  151 | 
  152 |   async verifyInvoiceActionButtons(): Promise<void> {
  153 |     await expect(this.createInvoiceButton).toBeVisible();
  154 |     await expect(this.reloadFromPatientButton).toBeVisible();
  155 |     await expect(this.printInvoiceButton).toBeVisible();
  156 |   }
  157 | 
  158 |   async verifyRefundPrerequisites(): Promise<void> {
  159 |     await this.verifyInvoiceActionButtons();
  160 |     await expect(this.billingLinesTab).toBeVisible();
  161 |     await expect(this.notesTab).toBeVisible();
  162 |     await expect(this.addLineButton).toBeVisible();
  163 |   }
  164 | 
  165 |   async verifyStatusFlowVisible(): Promise<void> {
  166 |     await expect(this.statusBar).toBeVisible();
  167 |     await expect(this.statusBar.getByText(/Draft|Invoiced|Partially Paid|Paid/i).first()).toBeVisible();
  168 |   }
  169 | 
  170 |   getNewButton(): Locator {
  171 |     return this.newButton;
  172 |   }
  173 | 
  174 |   getSearchInput(): Locator {
  175 |     return this.searchInput;
  176 |   }
  177 | 
  178 |   getSaveButton(): Locator {
  179 |     return this.saveButton;
  180 |   }
  181 | 
  182 |   getDiscardButton(): Locator {
  183 |     return this.discardButton;
  184 |   }
  185 | 
  186 |   getCreateInvoiceButton(): Locator {
  187 |     return this.createInvoiceButton;
  188 |   }
  189 | 
```