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
  
  for (const productList of data.productLists) {
    test(`Add products: ${productList.name}`, async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      await inventoryPage.goToProducts();
      await inventoryPage.addMultipleProducts(productList.products);
      await inventoryPage.viewCart();
      await cartPage.validateAllProducts(productList.products);
    });
  }

  test('Remove product from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const product = data.productLists[0].products[0];
    await inventoryPage.goToProducts();
    await inventoryPage.addSingleProduct(product.name);
    await inventoryPage.viewCart();
    await cartPage.verifyCartPage();
    await cartPage.removeProduct(product.name);
    await cartPage.verifyProductRemoved(product.name);
  });

});