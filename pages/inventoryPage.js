const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('.product-image-wrapper');
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
    await productCard.locator('.add-to-cart').first().click({ force: true });
  }

  async addMultipleProducts(productList) {
    for (const product of productList) {
      await this.addProduct(product.name);
      await this.goToProducts();
    }
  }

  async viewCart() {
    await this.page.getByRole('link', { name: 'Cart' }).click();
  }
}

module.exports = InventoryPage;