const { test, expect } = require("@playwright/test");
const LoginPage = require('../pages/loginPage');
const { ContactPage } = require("../pages/contactUsPage");
const contactData = require("../test-data/contactData.json");
const path = require("path");
const filePath = path.resolve(__dirname, "../test-data/sampleText.txt");

test.describe("Contact Us Form Test", () => {

  test("Submit Contact Us Form successfully", async ({ page }) => {
    const contactPage = new ContactPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(page).toHaveTitle(/Automation Exercise/);
    
  });

});