import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../lib/pages/LoginPage.js';


const customerAuthFile = 'playwright/.auth/existing-customer.json';

setup('Login as existing customer and save storageState', async ({ page }) => {
    
    if (!process.env.EXISTING_CUSTOMER_EMAIL || !process.env.EXISTING_CUSTOMER_PASSWORD) {
        throw new Error(
            `КРИТИЧЕСКАЯ ОШИБКА: Переменные окружения для Customer пусты на CI! ` +
            `Проверьте GitHub Secrets. EMAIL существует: ${!!process.env.EXISTING_CUSTOMER_EMAIL}, ` +
            `PASSWORD существует: ${!!process.env.EXISTING_CUSTOMER_PASSWORD}`
        );
    }
    
    const loginPage = new LoginPage(page);

    await loginPage.navigate('/auth/login');   
    await loginPage.customerLogin(
        process.env.EXISTING_CUSTOMER_EMAIL,
        process.env.EXISTING_CUSTOMER_PASSWORD
    );
    await expect(loginPage.page).toHaveURL('/account');
    await page.context().storageState({ path: customerAuthFile });
});

