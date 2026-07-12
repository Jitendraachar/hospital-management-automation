import { expect, type Page } from '@playwright/test';
import { LoginPage } from '../../LoginPage';
import { BillingPage } from '../../pages/BillingPage';

const USERNAME = 'team40';
const PASSWORD = 'vASPFtSh4d';

export async function loginAndOpenBilling(page: Page): Promise<BillingPage> {
  const loginPage = new LoginPage(page);
  const billingPage = new BillingPage(page);

  await page.goto('https://team40.qaaerp.com/odoo');

  const alreadyAuthenticated = await loginPage.getUserStatusButton().isVisible().catch(() => false);

  if (!alreadyAuthenticated) {
    await loginPage.open();
    await loginPage.login(USERNAME, PASSWORD);
  }

  await billingPage.openList();

  return billingPage;
}
