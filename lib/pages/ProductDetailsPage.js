import { expect } from '@playwright/test';
import { AbstractPage } from '../../lib/pages/AbstractPage.js';


export class ProductDetailsPage extends AbstractPage {

    constructor(page) {
        super(page);
        this.productNameHeader = page.getByTestId('product-name');
        this.productPrice = page.getByTestId('unit-price');
        this.quantityInput = page.getByTestId('quantity');
        this.addToCartBtn = page.getByTestId('add-to-cart');
        this.addToFavoriteBtn = page.getByTestId('add-to-favorites');
        this.compareBtn = page.getByTestId('add-to-compare');
        this.specsTable = page.getByRole('table');

    }

    async checkProductPageIsLoaded(expectedName) {
        await expect(this.productNameHeader).toHaveText(expectedName);
        await expect(this.addToCartBtn).toBeVisible({ timeout: 5000 });
    }

    async setQuantity(amount) {
        await this.quantityInput.fill(amount.toString());
    }
    
}        