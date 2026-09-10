import { test, expect } from '@playwright/test';
import { CustomerRegistrationPage } from '../../lib/pages/CustomerRegistrationPage.js';
import { LoginPage } from '../../lib/pages/LoginPage.js';
import { PersonalAccountPage } from '../../lib/pages/PersonalAccountPage.js';
import { generateUserData } from '../../lib/datafactory/testUserData.js';


test.describe('Authentication & Authorization new customer', () => {

    
    test.afterEach(async({page},testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            console.log(`afterEach: test failed: ${testInfo.title}`);
            await page.screenshot({
                path: `test-results/${testInfo.title} -failed.png`,
                fullPage: true,
            })
        }
    });


    test('New customer flow with valid  credentials', async({page}) => {
        const registerPage = new CustomerRegistrationPage(page);
        const loginPage = new LoginPage(page);
        const currentUserData = generateUserData();
        const myAccountPage = new PersonalAccountPage(page);
                

        await test.step('Step 1: Open login page', async() => {
            await registerPage.navigate('/');
            
        })


        await test.step('Step 2: Register a new customer', async () => {
            await registerPage.navigateToRegisterForm();
            await registerPage.fillRegistrationForm(currentUserData);
            await expect(registerPage.page).toHaveURL('/auth/login');
        })


        await test.step('Step 3: Login and Logout', async () => {
            await loginPage.customerLogin(currentUserData.email, currentUserData.password);
            const menuText = await loginPage.navMenu.checkUserNameText();
            expect(menuText).toContain(currentUserData.firstName);
            await expect(loginPage.page).toHaveURL('/account'); 
            await myAccountPage.checkMyAccountPageIsLoaded();
            await loginPage.navMenu.logout()
            await expect(loginPage.page).toHaveURL('/auth/login');
            
        });     
    
    })
    
})


