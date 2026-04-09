const { expect } = require('@playwright/test');
class ContactPage {
  constructor(page) {
    this.page = page;
    this.contactUsBtn = page.getByRole('link', { name: 'Contact us' });
    this.getInTouchText = page.getByText('GET IN TOUCH');
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageInput = page.locator('textarea[data-qa="message"]');
    this.fileUpload = page.locator('input[type="file"]');
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    this.successMsg = page.getByText('Success!', { exact: false });
    this.homeBtn = page.getByRole('link', { name: 'Home' });
  }
  
  async clickContactUs() {
    await this.contactUsBtn.click();
  }

  async verifyGetInTouchVisible() {
    await this.getInTouchText.waitFor({ state: 'visible' });
  }

  async fillContactForm(name, email, subject, message) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadFile(filePath) {
    await this.fileUpload.setInputFiles(filePath);
  }

  async submitForm() {
    this.submitBtn.click()                             
}

  async clickHome() {
    await this.homeBtn.click();
  }
}

module.exports = ContactPage;