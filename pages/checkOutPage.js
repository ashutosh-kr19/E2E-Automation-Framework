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
    this.downloadInvoiceBtn = page.getByRole('link', { name: 'Download Invoice' });
    this.continueBtn = page.getByRole('link', { name: 'Continue' });
    this.logoutBtn = page.getByRole('link', { name: 'Logout' });
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
    await expect(this.downloadInvoiceBtn).toBeVisible();
    await this.downloadInvoiceBtn.click();
  }

  async continueAfterOrder() {
    await expect(this.continueBtn).toBeVisible();
    await this.continueBtn.click();
  }

  async logout() {
    await expect(this.logoutBtn).toBeVisible();
    await this.logoutBtn.click();
  }
}

module.exports = CheckoutPage;