import { AbstractPage } from '../../lib/pages/AbstractPage.js';
import { expect } from '@playwright/test';


export class AdminAccountPage extends AbstractPage{
    constructor(page) {
        super(page);
        this.adminAccountHeading = page.getByText('Sales over the years', { exact: false });
        this.adminDashboardBtn = page.getByTestId('nav-admin-dashboard');
        this.adminBrandsBtn = page.getByTestId('nav-admin-brands');
        this.adminCategoriesBtn = page.getByTestId('nav-admin-categories');
        this.adminProductsBtn = page.getByTestId('nav-admin-products');
        this.adminOrdersBtn = page.getByTestId('nav-admin-orders');
        this.adminUsersBtn = page.getByTestId('nav-admin-users');
        this.adminMessagesBtn = page.getByTestId('nav-admin-messages');
        this.adminSettingsBtn = page.getByTestId('nav-admin-settings');
        this.adminStatisticsBtn = page.getByTestId('nav-admin-statistics');
        this.adminSalesPerMonthBtn = page.getByTestId('nav-average-month-sales');
        this.adminSalesPerWeekBtn = page.getByTestId('nav-average-week-sales');
        this.adminReportBtn = page.getByRole('button', { name: 'Reports' });
        this.adminSignOutBtn = page.getByTestId('nav-admin-sign-out');
    }

    async checkAdminAccountPageIsLoaded() {
        await expect(this.page).toHaveURL(/.*\/admin\/dashboard/);    
        await this.adminAccountHeading.scrollIntoViewIfNeeded();
        await expect(this.adminAccountHeading).toBeVisible({ timeout: 10000 });
    }

}
