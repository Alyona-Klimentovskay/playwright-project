import { NavMenuComponent } from '../../lib/components/navMenu.js';
import { expect } from '@playwright/test';


export class AbstractPage {
    constructor(page) {
        this.page = page;
        this.navMenu = new NavMenuComponent(page);
        this.alertBannerContainer = page.getByRole('alert');
    }

    async navigate(path = '') {
        await this.page.goto(path);       
    }

    async verifyAlertBannerMessage(expectedMessage) {
        await expect(this.alertBannerContainer).toBeVisible();       
        await expect(this.alertBannerContainer).toContainText(expectedMessage);
    }

     
}    

