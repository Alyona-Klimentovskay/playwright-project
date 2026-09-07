import { test, expect } from '@playwright/test';
import { AdminAccountPage } from '../../lib/pages/AdminAccountPage.js';
import { ADMIN_OPTIONS } from '../../lib/datafactory/dropDownMenuData.js';


test.use({ storageState: 'playwright/.auth/admin.json' });

test.describe('Verify Admin Account Options and Navigation', () => {
    let adminAccountPage;

    test.beforeEach(async ({ page }) => {
        adminAccountPage = new AdminAccountPage(page);
        await page.goto('/admin/dashboard');
        await adminAccountPage.checkAdminAccountPageIsLoaded();
    });
     
    
    test('Verify admin identity and list of available options', async() => {       
        const expectedAdminOptions = [
            ADMIN_OPTIONS.DASHBOARD,
            ADMIN_OPTIONS.BRANDS,
            ADMIN_OPTIONS.CATEGORIES,
            ADMIN_OPTIONS.PRODUCTS,
            ADMIN_OPTIONS.ORDERS,
            ADMIN_OPTIONS.USERS,
            ADMIN_OPTIONS.MESSAGES,
            ADMIN_OPTIONS.SETTINGS,
            ADMIN_OPTIONS.REPORTS.MAIN,
            ADMIN_OPTIONS.REPORTS.STATISTICS,              
            ADMIN_OPTIONS.REPORTS.AVERAGE_SALES_PER_MONTH, 
            ADMIN_OPTIONS.REPORTS.AVERAGE_SALES_PER_WEEK,  
            ADMIN_OPTIONS.SIGN_OUT
        ];

        const expectedFullName = `${process.env.ADMIN_FIRST_NAME} ${process.env.ADMIN_LAST_NAME}`;
        const adminMenuLocator = adminAccountPage.navMenu.getAdminMenuLocator();
        await expect(adminMenuLocator).toContainText(expectedFullName);
        
        const actualOptions = await adminAccountPage.navMenu.getMenuOptions();
        for (const option of expectedAdminOptions) {
            expect(actualOptions).toContainEqual(option);
        }
        expect(actualOptions.length).toBe(expectedAdminOptions.length);     
        
    })

    
    test('Verify successful switching between account sections', async() => {  
        await adminAccountPage.navMenu.selectMenuOptions(ADMIN_OPTIONS.USERS);
        await expect(adminAccountPage.page).toHaveURL('/admin/users');

        await adminAccountPage.navMenu.selectMenuOptions(ADMIN_OPTIONS.BRANDS);
        await expect(adminAccountPage.page).toHaveURL('/admin/brands');

        await adminAccountPage.navMenu.selectMenuOptions(ADMIN_OPTIONS.CATEGORIES);
        await expect(adminAccountPage.page).toHaveURL('/admin/categories');
    
        await adminAccountPage.navMenu.selectMenuOptions(ADMIN_OPTIONS.PRODUCTS);
        await expect(adminAccountPage.page).toHaveURL('/admin/products');

        await adminAccountPage.navMenu.selectMenuOptions(ADMIN_OPTIONS.ORDERS);
        await expect(adminAccountPage.page).toHaveURL('/admin/orders');

        await adminAccountPage.navMenu.selectMenuOptions(ADMIN_OPTIONS.MESSAGES);
        await expect(adminAccountPage.page).toHaveURL('/admin/messages');

        await adminAccountPage.navMenu.selectMenuOptions(ADMIN_OPTIONS.SETTINGS);
        await expect(adminAccountPage.page).toHaveURL('/admin/settings');

        await adminAccountPage.navMenu.selectMenuOptions(ADMIN_OPTIONS.DASHBOARD);
        await expect(adminAccountPage.page).toHaveURL('/admin/dashboard');
    
    })

    
    test('Logout and verify redirection to login page', async() => {     
        await adminAccountPage.navMenu.logout();
        await expect(adminAccountPage.page).toHaveURL('/auth/login');

    })
                        
})

