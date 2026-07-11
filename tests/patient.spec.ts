import { expect, test } from '@playwright/test';
import { loginAsValidUser } from '../helpers/auth';
import { captureFailureScreenshot } from '../helpers/testHooks';
import { PatientPage } from '../pages/PatientPage';

test.describe('Patient Module', () => {
    test.afterEach(async ({ page }, testInfo) => {
        await captureFailureScreenshot(page, testInfo);
    });

    test('should load patient list with core columns and controls', async ({ page }) => {
        const patientPage = new PatientPage(page);

        await loginAsValidUser(page);
        await patientPage.openList();

        await expect(page).toHaveURL(/action-372\/action-374/);
        await expect(patientPage.getNewButton()).toBeVisible();
        await expect(patientPage.getSearchInput()).toBeVisible();
        await expect(patientPage.getPatientUhidHeader()).toBeVisible();
        await expect(patientPage.getPatientNameHeader()).toBeVisible();
        await expect(patientPage.getPatientPhoneHeader()).toBeVisible();
        await expect(patientPage.getPatientEmailHeader()).toBeVisible();
    });

    test('should open new patient form with mandatory and contact fields', async ({ page }) => {
        const patientPage = new PatientPage(page);

        await loginAsValidUser(page);
        await patientPage.openNewForm();

        await expect(page).toHaveURL(/action-372\/action-374\/new/);
        await expect(patientPage.getPatientNameInput()).toBeVisible();
        await expect(patientPage.getPhoneInput()).toBeVisible();
        await expect(patientPage.getEmailInput()).toBeVisible();
        await expect(patientPage.getAddressInput()).toBeVisible();
        await expect(patientPage.getSaveButton()).toBeVisible();
        await expect(patientPage.getDiscardButton()).toBeVisible();
    });

    test('should search existing patient by UHID', async ({ page }) => {
        const patientPage = new PatientPage(page);

        await loginAsValidUser(page);
        await patientPage.openList();
        await patientPage.search('PAT/00002');

        await expect(patientPage.getRowByText('PAT/00002')).toBeVisible();
    });

    test('should handle no-match patient search query safely', async ({ page }) => {
        const patientPage = new PatientPage(page);

        await loginAsValidUser(page);
        await patientPage.openList();
        await patientPage.search('NO_MATCH_PATIENT_001');

        await expect(page).toHaveURL(/action-372\/action-374/);
        await expect(patientPage.getSearchInput()).toHaveValue('NO_MATCH_PATIENT_001');
    });

    test('should handle SQL-like search payload without crashing', async ({ page }) => {
        const patientPage = new PatientPage(page);

        await loginAsValidUser(page);
        await patientPage.openList();
        await patientPage.search(`' OR '1'='1`);

        await expect(page).toHaveURL(/action-372\/action-374/);
        await expect(patientPage.getSearchInput()).toHaveValue(`' OR '1'='1`);
    });
});
