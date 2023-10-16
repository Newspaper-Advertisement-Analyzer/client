const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get("localhost:3000/authentication/signin");
    await driver.findElement(By.id("email")).sendKeys("test@advizor.com");
    await driver.findElement(By.id("password")).sendKeys("test");
    const buttonElement = await driver.findElement(By.id("sign-in-button")); // Change to your button's identifier

    // Click the button
    await buttonElement.click();
    await driver.wait(until.titleIs("New Page Title"), 10000);
  } finally {
    await driver.quit();
  }
})();
