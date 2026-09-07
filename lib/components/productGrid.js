
export class ProductGridComponent {
    constructor(page) {
        this.page = page;
        this.productCards = page.locator('.card');
    }

    getProductCardByName(productName) {
        return this.productCards.filter({ hasText: productName });
    }

    async getProductPrice(productName) {
        const card = this.getProductCardByName(productName);
        const priceText = await card.getByTestId('product-price').innerText();
        return priceText.trim();
    }

    async openProductDetails(productName) {
        const card = this.getProductCardByName(productName);
        await card.locator('img, .card-title').first().click();
        await this.page.waitForLoadState('networkidle');
    }


}