const { Builder, By, Key, until } = require("selenium-webdriver");
var assert = require("assert");

//Sleep fucntion to make Selenium wait for the webpage to load
(async function example() {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Assigns Chrome to be the test builder
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    //Navigates to the login page and enters the site with a standard account
    await driver.get("http://localhost:3000/login");
    await sleep(1000);
    await driver.findElement(By.id("accessibility-mode-checkbox")).click();
    await driver
      .findElement(By.className("accessibility-mode"))

    //Prints whether or not the test was sucessful
    console.log("Accessibility Mode test sucessful");
  } catch (err) {
    console.log("Accessibility Mode test failed - " + err);
  } finally {
    await driver.quit();
  }
})();
