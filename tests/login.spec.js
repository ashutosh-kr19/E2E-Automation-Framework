const { test } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const users = require('../test-data/user.json');

test.describe('Login Tests', () => {
  let loginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });
  
  test('Valid Login', async () => {
    await loginPage.login(
      users.validUser.email,
      users.validUser.password
    );
    await loginPage.verifyLoginSuccess();
  });

  test('Invalid Password', async () => {
    await loginPage.login(
      users.wrongPasswordUser.email,
      users.wrongPasswordUser.password
    );
    await loginPage.verifyLoginError();
  });

  test('Unregistered User', async () => {
    await loginPage.login(
      users.invalidUser.email,
      users.invalidUser.password
    );
    await loginPage.verifyLoginError();
  });
});