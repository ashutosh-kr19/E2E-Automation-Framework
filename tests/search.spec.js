const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CartPage = require('../pages/cartPage');
const user = require('../test-data/user.json');

test.describe('Search Products', () => {
  let loginPage, inventoryPage, cartPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigate();
  });

  test('Search Products and Verify Cart After Login', async ({ page }) => {
    await inventoryPage.goToProducts();
    await expect(page).toHaveURL(/products/);
    await inventoryPage.searchProduct('Top');
    await inventoryPage.verifySearchedProductsVisible();
    await inventoryPage.verifySearchResults();
    const products = await inventoryPage.addSearchedProductsToCart();
    await inventoryPage.viewCart();
    await cartPage.verifyCartPage();
    await cartPage.validateAllProducts(products);
    await loginPage.login(
      user.validUser.email,
      user.validUser.password
    );
    await loginPage.verifyLoginSuccess();
    await inventoryPage.viewCart();
    await cartPage.validateAllProducts(products);
  });

});