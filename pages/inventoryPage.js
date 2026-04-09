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
}

module.exports = InventoryPage;