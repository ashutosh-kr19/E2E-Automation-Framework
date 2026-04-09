const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.signupLoginBtn = page.getByRole('link', { name: 'Signup / Login' });
    this.emailLogin = page.locator('input[data-qa="login-email"]');
    this.passwordLogin = page.locator('input[data-qa="login-password"]');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.loggedInText = page.locator('text=Logged in as');
    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.errorMsg = page.getByText('Your email or password is incorrect!');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/');
  }

  async goToLogin() {
    await this.signupLoginBtn.click();
    await expect(this.loginHeading).toBeVisible();
  }

  async login(email, password) {
    await this.goToLogin();
    await this.emailLogin.fill(email);
    await this.passwordLogin.fill(password);
    await this.loginBtn.click();
  }

  async verifyLoginSuccess() {
    await expect(this.loggedInText).toBeVisible();
  }

  async verifyLoginError() {
    await expect(this.errorMsg).toBeVisible();
  }
}

module.exports = LoginPage;