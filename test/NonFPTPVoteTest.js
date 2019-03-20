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
    await driver.findElement(By.linkText("Lead Developer Election")).click();
    await sleep(3000);

    await driver.findElement(By.name("btnAdd")).click();
    await driver.findElement(By.name("btnAdd")).click();
    await driver.findElement(By.name("btnAdd")).click();
    await driver.findElement(By.name("btnAdd")).click();
    await sleep(1000);
    await driver.findElement(By.name("btnSubmit")).click();
    await sleep(5000);

    let CurrentURL = await driver.getCurrentUrl();
    assert(
      CurrentURL ==
        "http://localhost:3000/vote-confirmed/Lead%20Developer%20Election"
    );

    console.log("Non-FPTP Vote test sucessful");
  } catch (err) {
    console.log("Non-FPTP Vote failed - " + err);
  } finally {
    await driver.quit();
  }
})();
