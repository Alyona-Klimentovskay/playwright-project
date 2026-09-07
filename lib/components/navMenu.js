import { expect } from '@playwright/test';


export class NavMenuComponent {
    constructor(page) {
        this.page = page;
        this.homeBtn = page.getByTestId('nav-home');
        this.categoriesDropDown = page.getByTestId('nav-categories');
        this.contactBtn = page.getByTestId('nav-contact');
        this.signInBtn = page.getByTestId('nav-sign-in');
        this.languageDropDown = page.getByTestId('language-select');
        this.navMenuDropDown = page.getByTestId('nav-menu');
        this.myAccountOption = page.getByTestId('nav-my-account');
        this.myProfileOption = page.getByTestId('nav-my-profile');
        this.myFavoritesOption = page.getByTestId('nav-my-favorites');
        this.myInvoices = page.getByTestId('nav-my-invoices');
        this.myMessages = page.getByTestId('nav-my-messages');
        this.signOutBtn = page.getByTestId('nav-sign-out');
        this.dropdownMenuContainer =  page.locator('ul[aria-labelledby="menu"]');
        this.menuOptions = this.dropdownMenuContainer.locator('a, button');
        
    }
    
    async clickHome() {
        await this.homeBtn.click();
    }
    
    async clickSignIn() {
        await this.signInBtn.click();
    }

    async clickContact() {
        await this.contactBtn.click();
    }

    async selectCategories(categoryName) {
        await this.categoriesDropDown.click();
        const categoryItem = this.page.locator('.dropdown-menu .dropdown-item', { hasText: categoryName });
        await categoryItem.click();
    }

    async changeLanguage(langCode) {
        await this.languageDropDown.click();
        const languageItem = this.page.locator('.dropdown-menu .dropdown-item', { hasText: langCode });
        await languageItem.click();
    }

    async goToMyAccount() {
        await this.navMenuDropDown.click();
        await this.myAccountOption.click(); 
                
    }

    async checkUserNameText() {
        await this.navMenuDropDown.waitFor({ state: 'visible' });
        return await this.navMenuDropDown.textContent();
    }

    getAdminMenuLocator(){
        return this.navMenuDropDown;
    }

    async getMenuOptions() {
        await this.navMenuDropDown.click();
        await expect(this.dropdownMenuContainer).toBeVisible({ timeout: 5000 });
        await this.menuOptions.first().waitFor({ state: 'visible', timeout: 5000 });
        const texts = await this.menuOptions.allTextContents();
        return texts.map(text => text.trim()).filter(text => text.length > 0);
    }
    
    
    async logout() {
        await this.navMenuDropDown.click();
        await this.signOutBtn.click();
    
    }

    async selectMenuOptions(optionName) {
        await this.navMenuDropDown.click();
        await expect(this.dropdownMenuContainer).toBeVisible();
        const option = this.dropdownMenuContainer.locator('a, button', { hasText: optionName });
        await option.click();
    }

}

