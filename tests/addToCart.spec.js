const { test } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CartPage = require('../pages/cartPage');
const user = require('../test-data/user.json');
const data = require('../test-data/product.json');

test.describe('Cart Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
      user.validUser.email,
      user.validUser.password
    );
    await loginPage.verifyLoginSuccess();
  });

  for (const testCase of data.testCases) {
    test(`${testCase.name}`, async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      await inventoryPage.goToProducts();
      await inventoryPage.addMultipleProducts(testCase.products);
      await inventoryPage.viewCart();
      await cartPage.validateAllProducts(testCase.products);
    });
  }

});