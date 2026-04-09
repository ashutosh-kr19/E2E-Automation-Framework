const { test } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkOutPage');
const user = require('../test-data/user.json');
const data = require('../test-data/product.json');

test.describe('Checkout Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Place Order: Login before Checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await loginPage.login(
      user.validUser.email,
      user.validUser.password
    );
    await loginPage.verifyLoginSuccess();
    const products = data.productLists[1].products;
    await inventoryPage.goToProducts();
    await inventoryPage.addMultipleProducts(products);
    await inventoryPage.viewCart();
    await cartPage.verifyCartPage();
    await cartPage.proceedToCheckout();
    await checkoutPage.placeOrder();
    await checkoutPage.makePayment(user.validUser);
    await checkoutPage.verifyOrderSuccess();
  });

});