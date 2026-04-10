const { expect } = require('@playwright/test');
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartRows = page.locator('tbody tr');
    this.checkoutBtn = page.getByText('Proceed To Checkout');
    this.loginModel = page.locator('//a[@href="/login"]//u[text()="Register / Login"]');
  }

  getProductRow(productName) {
    return this.cartRows.filter({ hasText: productName }).first();
  }

  parsePrice(text) {
    return parseInt(text.replace('Rs.', '').trim());
  }

  async verifyCartPage() {
    await expect(this.page).toHaveURL(/view_cart/);
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

  async removeProduct(productName) {
    const row = this.getProductRow(productName);
    await row.locator('.cart_quantity_delete').click();
  }

  async verifyProductRemoved(productName) {
    await expect(this.getProductRow(productName)).not.toBeVisible();
  }

  async clickLoginFromModal() {
    //await this.page.locator('//a[@href="/login"]//u[text()="Register / Login"]').click();
    await this.loginModel.click();
  }
}

module.exports = CartPage;