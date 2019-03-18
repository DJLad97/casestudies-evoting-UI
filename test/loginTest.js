const { Builder, By, Key, until } = require("selenium-webdriver");
var assert = require("assert");

(async function example() {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:3000/login");
    await sleep(1000);
    await driver.findElement(By.name("postCode")).sendKeys("s14dg");
    await driver
      .findElement(By.name("userCode"))
      .sendKeys("b3b34acfbd88b79e721ba26c4fe6646c799f91fd");
    await sleep(1000);
    await driver.findElement(By.name("btnCreate")).click();
    await sleep(1000);
    let CurrentURL = await driver.getCurrentUrl();
    assert(CurrentURL == "http://localhost:3000/elections");
    await sleep(1000);

    console.log("Login test sucessful");
  } catch (err) {
    console.log("Login test failed - " + err);
  } finally {
    await driver.quit();
  }
})();
