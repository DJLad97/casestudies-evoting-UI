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
    await driver.findElement(By.name("postCode")).sendKeys("s14dg");
    await driver
      .findElement(By.name("userCode"))
      .sendKeys("b3b34acfbd88b79e721ba26c4fe6646c799f91fd");
    await driver.findElement(By.name("btnLogin")).click();
    await sleep(3000);

    //Enters the first past the post election
    await driver.findElement(By.name("btnViewAll")).click();
    await sleep(2000);
    await driver
      .findElement(By.linkText("EU Referendum 2 - Electric Boogaloo"))
      .click();
    await sleep(3000);

    //Casts a vote for the FPTP election
    await driver.findElement(By.name("vote")).click();
    await sleep(1000);
    await driver.findElement(By.name("btnSubmit")).click();
    await sleep(1000);
    await driver.findElement(By.name("btnConfirm")).click();

    await sleep(2000);
    //Test passes once it reaches the following URL:
    let CurrentURL = await driver.getCurrentUrl();
    assert(
      CurrentURL ==
        "http://localhost:3000/vote-confirmed/EU%20Referendum%202%20-%20Electric%20Boogaloo"
    );
    await sleep(1000);

    //Prints whether or not the test was sucessful
    console.log("Election test sucessful");
  } catch (err) {
    console.log("Election test failed - " + err);
  } finally {
    await driver.quit();
  }
})();
