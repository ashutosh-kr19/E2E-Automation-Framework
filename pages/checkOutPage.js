const { expect } = require('@playwright/test');
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.commentBox = page.locator('textarea[name="message"]');
    this.placeOrderBtn = page.getByText('Place Order');
    this.nameOnCard = page.locator('input[name="name_on_card"]');
    this.cardNumber = page.locator('input[name="card_number"]');
    this.cvc = page.locator('input[name="cvc"]');
    this.expiryMonth = page.locator('input[name="expiry_month"]');
    this.expiryYear = page.locator('input[name="expiry_year"]');
    this.payBtn = page.getByRole('button', { name: 'Pay and Confirm Order' });
    this.successMsg = page.getByText('Congratulations! Your order has been confirmed!');
  }

  async placeOrder() {
    await this.commentBox.fill('Test Order');
    await this.placeOrderBtn.click();
  }

  async makePayment(user) {
    await this.nameOnCard.fill(user.nameOnCard);
    await this.cardNumber.fill(user.cardNumber);
    await this.cvc.fill(user.cvc);
    await this.expiryMonth.fill(user.expiryMonth);
    await this.expiryYear.fill(user.expiryYear);
    await this.payBtn.click();
  }

  async verifyOrderSuccess() {
    await expect(this.successMsg).toBeVisible();
  }

  async downloadInvoice() {
  const downloadBtn = this.page.getByRole('link', { name: 'Download Invoice' });
  await expect(downloadBtn).toBeVisible();
  await downloadBtn.click();
}

async continueAfterOrder() {
  const continueBtn = this.page.getByRole('link', { name: 'Continue' });
  await expect(continueBtn).toBeVisible();
  await continueBtn.click();
}

async logout() {
  const logoutBtn = this.page.getByRole('link', { name: 'Logout' });
  await expect(logoutBtn).toBeVisible();
  await logoutBtn.click();
}
}

module.exports = CheckoutPage;