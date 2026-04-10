const { expect } = require('@playwright/test');
class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  async goToProducts() {
    await this.page.getByRole('link', { name: 'Products' }).click();
  }

  async addProduct(productName) {
    const productCard = this.page
      .locator('.product-image-wrapper')
      .filter({ hasText: productName })
      .first();

    await productCard.waitFor({ state: 'visible' });
    await productCard.locator('.add-to-cart').first().click();
    await this.page.getByText('Continue Shopping').click();
  }

  async addSingleProduct(productName) {
    await this.addProduct(productName);
  }

  async addMultipleProducts(products) {
    for (const product of products) {
      await this.addProduct(product.name);
    }
  }

  async viewCart() {
    await this.page.getByRole('link', { name: 'Cart' }).click();
  }

  async addSearchedProductsToCart() {
    const products = [];
    const item = this.page.locator('.product-image-wrapper').first();
    const name = await item.locator('p').first().innerText();
    const priceText = await item.locator('h2').first().innerText();
    const price = parseInt(priceText.replace('Rs.', '').trim());
    products.push({ name, price });
    await item.locator('.add-to-cart').first().click();
    await this.page.getByText('Continue Shopping').click();
    return products;
  }

  async searchProduct(productName) {
    await this.page.locator('#search_product').fill(productName);
    await this.page.locator('#submit_search').click();
  }

  async verifySearchedProductsVisible() {
    await this.page.getByText('SEARCHED PRODUCTS').waitFor();
  }

  async verifySearchResults() {
    const results = this.page.locator('.product-image-wrapper');
    await expect(results.first()).toBeVisible();
  }

}

module.exports = InventoryPage;