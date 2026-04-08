const { test } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkOutPage');
const user = require('../test-data/user.json');
const data = require('../test-data/product.json');

test.describe('E2E Checkout Flow', () => {
  let loginPage, inventoryPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.navigate();
    await loginPage.login(
      user.validUser.email,
      user.validUser.password
    );
    await loginPage.verifyLoginSuccess();
  });

  test('Complete Flow', async ({ page }) => {
    const products = data.testCases[1].products;
    await inventoryPage.goToProducts();
    await inventoryPage.addMultipleProducts(products);
    await inventoryPage.viewCart();
    await cartPage.validateAllProducts(products);
    await cartPage.proceedToCheckout();
    await checkoutPage.placeOrder();
    await checkoutPage.makePayment(user.validUser);
    await checkoutPage.verifyOrderSuccess();
    await checkoutPage.downloadInvoice();
    await checkoutPage.continueAfterOrder();
    await checkoutPage.logout();
  });
});