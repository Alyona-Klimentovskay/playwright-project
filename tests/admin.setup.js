import { test as setup } from '@playwright/test';
import { LoginPage } from '../lib/pages/LoginPage.js';
import { AdminAccountPage } from '../lib/pages/AdminAccountPage.js';


const adminAuthFile = 'playwright/.auth/admin.json';

setup('Login as admin and save storageState', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const adminAccountPage = new AdminAccountPage(page);
    await loginPage.navigate('/auth/login');       
    await loginPage.adminLogin(
        process.env.ADMIN_EMAIL,
        process.env.ADMIN_PASSWORD
    ); 
    // await expect(page).toHaveURL(/.*\/admin\/dashboard/, { timeout: 10000 });
    await adminAccountPage.checkAdminAccountPageIsLoaded()
    const adminMenu = adminAccountPage.navMenu.getAdminMenuLocator();
    await adminMenu.waitFor({ state: 'visible' })
    await page.context().storageState({ path: adminAuthFile });
});
