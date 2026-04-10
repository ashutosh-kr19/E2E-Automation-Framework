Playwright Automation Framework:

This project is an End-to-End (E2E) Automation Framework built using Playwright with JavaScript.
It covers real-world test scenarios like login, add to cart, and complete checkout flow.

=>Project Objective

  The goal of this project is to:
    -Build a Playwright framework from scratch
    -Follow proper folder structure
    -Use Page Object Model (POM)
    -Avoid hardcoding by using JSON test data
    -Automate real-world scenarios
    -Generate reports and integrate CI/CD

=>Project Structure  
    E2E-Automation-Framework/
    │── .github/workflows/  # CI/CD pipeline
    │── pages/              # Page Object classes
    │── test-data/          # JSON test data     
    │── tests/              # Test files 
    │── package.json     
    │── playwright.config.js
    │── README.md  

=>Test Scenarios Covered
    Login Functionality:
        -Valid login
        -Invalid login
        -User not found
    
    Add to Cart
        -Add single product
        -Add multiple products
        -Validate product name and price

    End-to-End Checkout Flow
        -Add multiple products
        -Verify cart details
        -Enter checkout details
        -Complete order
        -Validate success message
        -Logout

    ContactUs

    Search Product
        -Search Product
        -Add Product to Cart
        -Verify Cart
        -Login
        -Verify cart and Product Details         

=>Installation
    Install dependencies:

    npm init -y        /* Install the Node Modelue in folder */
    npm Install Playwright@latest   /* Install Playwright and dependencies */
    npx playwright test --headed    /* Run playwright test */
    npx allure generate ./allure-results --clean     /* Generate Allure Report */  
    npx allure open        /* Open Allure Result */

=> Learnings
    Learned how to design a scalable automation framework
    Understood Page Object Model structure
    Worked on real-world scenarios like checkout flow
    Improved debugging using Allure reports
    Got hands-on experience with CI/CD    