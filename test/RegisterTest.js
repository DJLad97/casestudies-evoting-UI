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
    //Navigates to the login page
    await driver.get("http://localhost:3000/login");
    await sleep(1000);

    //Fills out the registration form
    await driver.findElement(By.id("register-btn")).click();
    await driver.findElement(By.name("firstName")).sendKeys("firstName");
    await driver.findElement(By.name("lastName")).sendKeys("lastName");
    await driver.findElement(By.name("mPostCode")).sendKeys("S1 3NL");
    await sleep(1000);
    await driver.findElement(By.name("countryId")).sendKeys("united kindom");
    await driver.findElement(By.name("nationality")).sendKeys("bri");
    await driver.findElement(By.name("dateOfBirth")).sendKeys("16111996");
    await driver
      .findElement(By.name("fullAddress"))
      .sendKeys("12 Borkland Power, 16 Borkland Lane");
    await driver.findElement(By.name("btnRegisterModal")).click();

    await sleep(3000);

    //Accepts and closes the confirmation alert
    driver
      .switchTo()
      .alert()
      .accept();

    await sleep(3000);
    //Marks the test as passed once the Register Modal is closed and a message has been recieved
    let CurrentURL = await driver.getCurrentUrl();
    assert(CurrentURL == "http://localhost:3000/login");
    await sleep(1000);

    //Prints whether or not the test was sucessful
    console.log("Register test sucessful");
  } catch (err) {
    console.log("Register test failed - " + err);
  } finally {
    await driver.quit();
  }
})();
