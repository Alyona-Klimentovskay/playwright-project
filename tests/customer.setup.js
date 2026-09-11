import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../lib/pages/LoginPage.js';
import { PersonalAccountPage } from '../lib/pages/PersonalAccountPage.js';

const customerAuthFile = 'playwright/.auth/existing-customer.json';

setup('Login as existing customer and save storageState', async ({ page }) => {
      
    const loginPage = new LoginPage(page);
    const myAccountPage = new PersonalAccountPage(page);
    await loginPage.navigate('/auth/login'); 

    const loginResponsePromise = page.waitForResponse(
        response => response.url().includes('/users/login') && response.status() === 200,
        { timeout: 15000 }
    );
    
    await loginPage.customerLogin(
        process.env.EXISTING_CUSTOMER_EMAIL,
        process.env.EXISTING_CUSTOMER_PASSWORD
    );
    await loginResponsePromise;
    await expect(page).toHaveURL('/account', { timeout: 10000 });
    await myAccountPage.checkMyAccountPageIsLoaded();
    await page.context().storageState({ path: customerAuthFile });
});

