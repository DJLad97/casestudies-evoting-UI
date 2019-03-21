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

    //Enters the non-FPTP election
    await driver.findElement(By.name("btnViewAll")).click();
    await sleep(2000);
    await driver.findElement(By.linkText("Lead Developer Election")).click();
    await sleep(3000);

    //Selenium ranks all candidates in chronological order
    await driver.findElement(By.name("btnAdd")).click();
    await driver.findElement(By.name("btnAdd")).click();
    await driver.findElement(By.name("btnAdd")).click();
    await driver.findElement(By.name("btnAdd")).click();
    await sleep(1000);
    await driver.findElement(By.name("btnSubmit")).click();
    await sleep(5000);
    await driver.findElement(By.name("btnConfirm")).click();
    await sleep(5000);
    //Test passes once it reaches the following URL:
    let CurrentURL = await driver.getCurrentUrl();
    assert(
      CurrentURL ==
        "http://localhost:3000/vote-confirmed/Lead%20Developer%20Election"
    );

    //Prints whether or not the test was sucessful
    console.log("Non-FPTP Vote test sucessful");
  } catch (err) {
    console.log("Non-FPTP Vote failed - " + err);
  } finally {
    await driver.quit();
  }
})();
