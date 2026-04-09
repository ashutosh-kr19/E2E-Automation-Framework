class ContactPage {
  constructor(page) {
    this.page = page;
    this.contactUsBtn = page.locator("a[href='/contact_us']");
    this.getInTouchText = page.locator("text=Get In Touch");
    this.nameInput = page.locator("input[name='name']");
    this.emailInput = page.locator("input[name='email']");
    this.subjectInput = page.locator("input[name='subject']");
    this.messageInput = page.locator("textarea[name='message']");
    this.uploadFile = page.locator("input[name='upload_file']");
    this.submitBtn = page.locator("input[name='submit']");
    this.successMsg = page.locator("//div[contains(@class,'alert-success') and contains(text(),'Success!')]");
    this.homeBtn = page.locator("a[class='btn btn-success']");
  }

  async navigateToContactUs() {
    await this.contactUsBtn.click();
  }
  
  async fillContactForm(data) {
   
  }

  async uploadFileMethod(filePath) {
    
  }

  async submitForm() {
    
  }

  async clickHome() {
    
  }
}

module.exports = { ContactPage };