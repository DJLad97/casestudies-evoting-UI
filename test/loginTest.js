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
    //Navigates to the login page and enters the site with an auditor account
    await driver.get("http://localhost:3000/login");
    await sleep(1000);
    await driver.findElement(By.name("postCode")).sendKeys("s14dg");
    await driver
      .findElement(By.name("userCode"))
      .sendKeys("b3b34acfbd88b79e721ba26c4fe6646c799f91fd");
    await sleep(1000);
    await driver.findElement(By.name("btnLogin")).click();
    await sleep(1000);

    //Test passes once it reaches the following URL:
    let CurrentURL = await driver.getCurrentUrl();
    assert(CurrentURL == "http://localhost:3000/elections");
    await sleep(1000);

    //Prints whether or not the test was sucessful
    console.log("Login test sucessful");
  } catch (err) {
    console.log("Login test failed - " + err);
  } finally {
    await driver.quit();
  }
})();
