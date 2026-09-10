import { test, expect } from '@playwright/test';
import { PersonalAccountPage } from '../../lib/pages/PersonalAccountPage.js';
import { CUSTOMER_OPTIONS } from '../../lib/datafactory/dropDownMenuData.js';
import { LoginPage } from '../../lib/pages/LoginPage.js';


test.describe('Verify Personal Account Options and Navigation', () => {
    let myAccountPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('/account');
        myAccountPage = new PersonalAccountPage(page);
        await myAccountPage.checkMyAccountPageIsLoaded();
    });


    test('Verify customer identity and list of available options', async({page}) => {
        
        const expectedCustomerOptions = [
            CUSTOMER_OPTIONS.MY_ACCOUNT,
            CUSTOMER_OPTIONS.MY_FAVORITES,
            CUSTOMER_OPTIONS.MY_PROFILE,
            CUSTOMER_OPTIONS.MY_INVOICES,
            CUSTOMER_OPTIONS.MY_MESSAGES,
            CUSTOMER_OPTIONS.SIGN_OUT
        ];

        const expectedFullName = `${process.env.EXISTING_CUSTOMER_FIRST_NAME} ${process.env.EXISTING_CUSTOMER_LAST_NAME}`;   
        const actualMenuText = await myAccountPage.navMenu.checkUserNameText();
        expect(actualMenuText).toContain(expectedFullName);
        
        const actualOptions = await myAccountPage.navMenu.getMenuOptions();
        expect(actualOptions).toEqual(expectedCustomerOptions);
       
    })


    test('Verify successful switching between account sections', async({page}) => {
        
        await myAccountPage.navMenu.selectMenuOptions(CUSTOMER_OPTIONS.MY_PROFILE);
        await expect(myAccountPage.page).toHaveURL('/account/profile');

        await myAccountPage.navMenu.selectMenuOptions(CUSTOMER_OPTIONS.MY_INVOICES);
        await expect(myAccountPage.page).toHaveURL('/account/invoices');

        await myAccountPage.navMenu.selectMenuOptions(CUSTOMER_OPTIONS.MY_FAVORITES);
        await expect(myAccountPage.page).toHaveURL('/account/favorites');

        await myAccountPage.navMenu.selectMenuOptions(CUSTOMER_OPTIONS.MY_MESSAGES);
        await expect(myAccountPage.page).toHaveURL('/account/messages');

    })
    
    
    test('Logout and verify redirection to login page', async({page}) => {
        
        await myAccountPage.navMenu.logout();
        await expect(page).toHaveURL('/auth/login');

    })
                        
})

