
export class ProductFiltersComponent {
    constructor(page) {
        this.page = page;
        this.searchInputField = page.getByTestId('search-query');
        this.searchSubmitBtn = page.getByTestId('search-submit');
        this.priceSliderMin = page.getByRole('slider', { name: 'ngx-slider' });
        this.priceSliderMax = page.getByRole('slider', { name: 'ngx-slider-max' });
    }
    
    async checkFilter(sectionName, checkboxName) {
        const section = this.page.locator('.col-md-3').filter({ hasText: sectionName });
        const checkbox = section.getByRole('checkbox', { name: checkboxName });
        await checkbox.scrollIntoViewIfNeeded(); 
        await checkbox.check();
        await this.page.waitForLoadState('networkidle');
    }

    async searchProduct(query) {
        await this.searchInputField.waitFor({ state: 'visible', timeout: 5000 });
        await this.searchInputField.fill(query);
        await this.searchInputField.press('Enter');   
        await this.page.waitForLoadState('networkidle'); 
    }

    async clearSearch() {
    await this.searchInputField.waitFor({ state: 'visible', timeout: 5000 });  
    await this.searchInputField.clear();  
    await this.searchInputField.press('Enter');
    await this.page.waitForLoadState('networkidle'); 

    }
    

}



