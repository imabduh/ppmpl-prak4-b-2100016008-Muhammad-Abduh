import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js'; // Tambahkan .js di akhir
import { expect } from 'chai';

const options = new chrome.Options(); // Membuat instance dari Options

describe('UI Testing using Selenium', function () {
    this.timeout(60000); // Set timeout for Mocha tests

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should load the login page', async function () {
        const loginPagePath = 'file:///D:/ppmpl/ppmpl-prak-4-b/loginPage.html'; // Pastikan path ini benar
        await driver.get(loginPagePath);
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    // ... (lanjutkan dengan pengujian lainnya)
});

    it('should input username and password using CSS Selectors', async function () {
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.css('#password')).sendKeys('password123');
        
        const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.css('#password')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button and validate successful login', async function () {
        await driver.findElement(By.css('#loginButton')).click();
        
        // Wait for the dashboard element to be displayed after a successful login
        const dashboardElement = await driver.wait(
            async () => {
                const el = await driver.findElement(By.id('dashboardElement')); // Ensure this ID matches the dashboard's HTML
                return el.isDisplayed() ? el : null;
            },
            10000 // Timeout after 10 seconds
        );

        expect(dashboardElement).to.exist; // Ensure the dashboard element is present
    });

    it('should handle failed login attempts', async function () {
        await driver.get('file:///D:/ppmpl/ppmpl-prak-4-b/loginPage.html'); // Reload the login page
        
        await driver.findElement(By.css('#username')).sendKeys('wronguser');
        await driver.findElement(By.css('#password')).sendKeys('wrongpassword');
        await driver.findElement(By.css('#loginButton')).click();
        
        // Wait for the error message to be displayed
        const errorMessageElement = await driver.wait(
            async () => {
                const el = await driver.findElement(By.id('errorMessage'));
                return el.isDisplayed() ? el : null;
            },
            10000 // Timeout after 10 seconds
        );

        const errorMessage = await errorMessageElement.getText();
        expect(errorMessage).to.equal('Invalid username or password.'); // Adjust expected message as needed
    });
    
    it('should input data using CSS Selector and XPath', async function () {

        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('password')).clear();

        await driver.findElement(By.css('#username')).sendKeys('testuser');

        await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');

        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should validate visibility of login elements', async function () {
        const isLoginButtonDisplayed = await driver.findElement(By.css('#loginButton')).isDisplayed();
        expect(isLoginButtonDisplayed).to.be.true;

        const isUsernameFieldDisplayed = await driver.findElement(By.css('#username')).isDisplayed();
        expect(isUsernameFieldDisplayed).to.be.true;

        const isPasswordFieldDisplayed = await driver.findElement(By.css('#password')).isDisplayed();
        expect(isPasswordFieldDisplayed).to.be.true;
    });