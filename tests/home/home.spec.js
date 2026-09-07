import { test, expect } from '@playwright/test';
import { HomePage } from '../../lib/pages/HomePage.js';
import { PRODUCT_CATEGORIES, LANGUAGE } from '../../lib/datafactory/dropDownMenuData.js';


test.describe('HomePage verification', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open();
    });

    test('Home page loads with products', async () => {
        await expect(homePage.navMenu.homeBtn).toBeVisible();
        await expect(homePage.filters.searchInputField).toBeVisible();
        await homePage.verifyProductCount(9);
    });

    test('Search a product via search bar', async () => {
        const searchQuery = 'Combination Pliers';   
        await homePage.filters.searchProduct(searchQuery);
        await homePage.verifyProductCount(1);
        await expect(homePage.grid.productCards.first()).toContainText(searchQuery);
        await homePage.filters.clearSearch();
    });

    test('Select a category via filter', async () => { 
        await homePage.filters.checkFilter('By category:', PRODUCT_CATEGORIES.POWER_TOOLS);
        await expect(homePage.grid.productCards).toHaveCount(5, { timeout: 5000 });

    });

    test('Verify language change in nav bar', async () => {
        await homePage.navMenu.changeLanguage(LANGUAGE.DE);
        await expect(homePage.navMenu.homeBtn).toHaveText('Start');
        await expect(homePage.navMenu.categoriesDropDown).toHaveText('Kategorien'); 
        await expect(homePage.navMenu.contactBtn).toHaveText('Kontakt');
        await expect(homePage.navMenu.signInBtn).toHaveText('Einloggen');
    });
 

});

