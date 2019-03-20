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
    await driver.findElement(By.name("btnLogin")).click();
    await sleep(3000);

    await driver.findElement(By.name("btnViewAll")).click();
    await sleep(2000);
    await driver.findElement(By.linkText("View as Auditor")).click();
    await sleep(3000);

    let CurrentURL = await driver.getCurrentUrl();
    assert(
      CurrentURL ==
        "http://localhost:3000/audit/viewelection/eu-referendum-2--electric-boogaloo"
    );
    await sleep(1000);

    console.log("Audit test sucessful");
  } catch (err) {
    console.log("Audit test failed - " + err);
  } finally {
    await driver.quit();
  }
})();
