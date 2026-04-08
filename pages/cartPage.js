const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartRows = page.locator('tbody tr');
    this.checkoutBtn = page.getByText('Proceed To Checkout');
  }

  getProductRow(productName) {
    return this.cartRows.filter({ hasText: productName }).first();
  }

  parsePrice(text) {
    return parseInt(text.replace('Rs.', '').trim());
  }

  async verifyProduct(product) {
    const row = this.getProductRow(product.name);

    await expect(row).toBeVisible();

    const price = this.parsePrice(await row.locator('td').nth(2).innerText());
    const qty = parseInt(await row.locator('td').nth(3).innerText());
    const total = this.parsePrice(await row.locator('td').nth(4).innerText());

    expect(price).toBe(product.price);
    expect(qty).toBeGreaterThan(0);
    expect(total).toBe(price * qty);
  }

  async validateAllProducts(products) {
    for (const product of products) {
      await this.verifyProduct(product);
    }
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}

module.exports = CartPage;