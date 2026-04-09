const { test, expect } = require('@playwright/test');
const path = require('path');
const LoginPage = require('../pages/loginPage');
const ContactPage = require('../pages/contactPage');
const contactData = require('../test-data/contactData.json');
test.describe('Contact Us Test Suite', () => {
  let loginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Submit Contact Form Successfully', async ({ page }) => {
    const contactPage = new ContactPage(page);
    await expect(page).toHaveTitle(/Automation Exercise/);
    await contactPage.clickContactUs();
    await contactPage.verifyGetInTouchVisible();
    const user = contactData.contactUser;
    await contactPage.fillContactForm(
      user.name,
      user.email,
      user.subject,
      user.message
    );
    const filePath = path.join(__dirname, '../test-data/sampleText.txt');
    await contactPage.uploadFile(filePath);
    await contactPage.submitForm();
    await contactPage.clickHome();
    await expect(page).toHaveURL('https://automationexercise.com/');
  });
});