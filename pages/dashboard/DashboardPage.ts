import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { getBaseUrl } from '../../helpers/env';

export type DashboardTopNavModule =
    | 'Dashboard'
    | 'Patients'
    | 'Doctors'
    | 'Prescriptions'
    | 'Lab Reports'
    | 'IPD Details'
    | 'Appointments'
    | 'Billings';

export type DashboardQuickAccessModule =
    | 'Patients'
    | 'Doctors'
    | 'Prescriptions'
    | 'Lab Reports'
    | 'IPD Details'
    | 'Appointments'
    | 'Billing'
    | 'Ward Management'
    | 'Bed Management';

export class DashboardPage extends BasePage {
    private readonly dashboardTopLink: Locator;
    private readonly moduleSearchInput: Locator;
    private readonly quickAccessLabel: Locator;
    private readonly hospitalOperationsHeading: Locator;
    private readonly hospitalOperationsDescription: Locator;

    private readonly totalPatientsCardLabel: Locator;
    private readonly opdAppointmentsCardLabel: Locator;
    private readonly pendingLabTestsCardLabel: Locator;
    private readonly paidRevenueCardLabel: Locator;
    private readonly activeDoctorsCardLabel: Locator;

    private readonly topNavLinks: Record<DashboardTopNavModule, Locator>;
    private readonly quickAccessDescriptions: Record<DashboardQuickAccessModule, string>;

    constructor(page: Page) {
        super(page);

        this.dashboardTopLink = page.getByRole('link', { name: 'Dashboard' }).first();
        this.moduleSearchInput = page.getByRole('textbox', { name: 'Search modules, features, tools...' });
        this.quickAccessLabel = page.getByText('Quick Access').first();
        this.hospitalOperationsHeading = page.getByRole('heading', { name: 'Hospital Operations' });
        this.hospitalOperationsDescription = page.getByText(
            'Manage all hospital operations efficiently from one centralized dashboard'
        );

        this.totalPatientsCardLabel = page.getByText('Total Patients', { exact: true }).first();
        this.opdAppointmentsCardLabel = page.getByText('OPD Appointments', { exact: true }).first();
        this.pendingLabTestsCardLabel = page.getByText('Pending Lab Tests', { exact: true }).first();
        this.paidRevenueCardLabel = page.getByText(/Paid Revenue|Total/i).first();
        this.activeDoctorsCardLabel = page.getByText('Active Doctors', { exact: true }).first();

        this.topNavLinks = {
            Dashboard: page.getByRole('link', { name: 'Dashboard' }).first(),
            Patients: page.getByRole('link', { name: 'Patients' }).first(),
            Doctors: page.getByRole('link', { name: 'Doctors' }).first(),
            Prescriptions: page.getByRole('link', { name: 'Prescriptions' }).first(),
            'Lab Reports': page.getByRole('link', { name: 'Lab Reports' }).first(),
            'IPD Details': page.getByRole('link', { name: 'IPD Details' }).first(),
            Appointments: page.getByRole('link', { name: 'Appointments' }).first(),
            Billings: page.getByRole('link', { name: 'Billings' }).first()
        };

        this.quickAccessDescriptions = {
            Patients: 'Patient records, appointments and charts',
            Doctors: 'Doctor profiles and availability',
            Prescriptions: 'Prescription management and printouts',
            'Lab Reports': 'View and update laboratory results',
            'IPD Details': 'Inpatient registrations and care sheets',
            Appointments: 'OPD appointments and scheduling',
            Billing: 'Patient invoices and payments',
            'Ward Management': 'Ward planning and allocation',
            'Bed Management': 'Real-time bed availability'
        };
    }

    async open(): Promise<void> {
        const url = new URL('/odoo/action-372', getBaseUrl()).toString();
        await this.navigate(url);
    }

    async expectDashboardLoaded(): Promise<void> {
        await expect(this.dashboardTopLink).toBeVisible();
        await expect(this.moduleSearchInput).toBeVisible();
        await expect(this.quickAccessLabel).toBeVisible();
        await expect(this.hospitalOperationsHeading).toBeVisible();
        await expect(this.hospitalOperationsDescription).toBeVisible();

        await expect(this.totalPatientsCardLabel).toBeVisible();
        await expect(this.opdAppointmentsCardLabel).toBeVisible();
        await expect(this.pendingLabTestsCardLabel).toBeVisible();
        await expect(this.paidRevenueCardLabel).toBeVisible();
        await expect(this.activeDoctorsCardLabel).toBeVisible();
    }

    async searchModule(term: string): Promise<void> {
        await this.fill(this.moduleSearchInput, term);
        await this.page.keyboard.press('Enter');
    }

    async clearModuleSearch(): Promise<void> {
        await this.fill(this.moduleSearchInput, '');
        await this.page.keyboard.press('Enter');
    }

    async clickTopNav(moduleName: DashboardTopNavModule): Promise<void> {
        await this.click(this.topNavLinks[moduleName]);
    }

    async clickQuickAccess(moduleName: DashboardQuickAccessModule): Promise<void> {
        const description = this.quickAccessDescriptions[moduleName];
        await this.click(this.page.getByText(description, { exact: true }).first());
    }

    getModuleSearchInput(): Locator {
        return this.moduleSearchInput;
    }

    getTopNav(moduleName: DashboardTopNavModule): Locator {
        return this.topNavLinks[moduleName];
    }

    getQuickAccessHeading(): Locator {
        return this.hospitalOperationsHeading;
    }

    getQuickAccessCardDescription(moduleName: DashboardQuickAccessModule): Locator {
        return this.page.getByText(this.quickAccessDescriptions[moduleName], { exact: true }).first();
    }

    getKpiLabel(label: 'Total Patients' | 'OPD Appointments' | 'Pending Lab Tests' | 'Paid Revenue' | 'Active Doctors'): Locator {
        if (label === 'Total Patients') {
            return this.totalPatientsCardLabel;
        }

        if (label === 'OPD Appointments') {
            return this.opdAppointmentsCardLabel;
        }

        if (label === 'Pending Lab Tests') {
            return this.pendingLabTestsCardLabel;
        }

        if (label === 'Active Doctors') {
            return this.activeDoctorsCardLabel;
        }

        return this.paidRevenueCardLabel;
    }
}
