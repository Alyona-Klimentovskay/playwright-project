import { test, expect } from '@playwright/test';
import { LoginPage } from '../../lib/pages/LoginPage.js';
import { AdminAccountPage } from '../../lib/pages/AdminAccountPage.js';


test.describe('Authorization as admin', () => {

    
    test.afterEach(async({page},testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            console.log(`afterEach: test failed: ${testInfo.title}`);
            await page.screenshot({
                path: `test-results/${testInfo.title} -failed.png`,
                fullPage: true,
            })
        }
    });     

    test('Amin flow with valid  credentials', async({page}) => {
        const adminAccountPage = new AdminAccountPage(page);
        const loginPage = new LoginPage(page);


        await test.step('Step 1: Open login page', async() => {
            await loginPage.navigate('/auth/login');
            
        });


        await test.step('Step 2: Login and Logout as admin', async () => {
            await loginPage.adminLogin();
            await expect(adminAccountPage.page).toHaveURL('/admin/dashboard');
            const expectedAdminName = `${process.env.ADMIN_FIRST_NAME} ${process.env.ADMIN_LAST_NAME}`; 
            const adminMenu = loginPage.navMenu.getAdminMenuLocator();
            await expect(adminMenu).toContainText(expectedAdminName);         
            await adminAccountPage.checkAdminAccountPageIsLoaded();
            await loginPage.navMenu.logout();
            await expect(adminAccountPage.page).toHaveURL('/auth/login');

        })
        

    }) 


})