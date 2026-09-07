import { expect } from '@playwright/test';
import { AbstractPage } from '../../lib/pages/AbstractPage.js';
import  { ProductFiltersComponent } from '../../lib/components/productFilters.js';
import { ProductGridComponent } from '../../lib/components/productGrid.js';
import { NavMenuComponent } from '../../lib/components/navMenu.js';


export class HomePage extends AbstractPage {
    constructor(page) {
        super(page);      
        this.filters = new ProductFiltersComponent(page);
        this.grid = new ProductGridComponent(page);
        this.navMenu = new NavMenuComponent(page);
    }

    async open() {
        await this.navigate();   
        await this.filters.searchInputField.waitFor({ state: 'visible', timeout: 5000 });
        return this;
    }

    async verifyProductCount(expectedCount) {        
        await expect(this.grid.productCards).toHaveCount(expectedCount, { timeout: 7000 });
    }


}