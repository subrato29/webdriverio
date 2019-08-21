const defineSupportCode = require('cucumber').defineSupportCode;
const expect = require('chai').expect;
const locator = require('./locator');

defineSupportCode(function({Given, When, Then}){
    Given(/^I launch opencart url$/, function(){
        browser.url('/');
    });
    Then(/^I verify title$/, function(){
        const title = browser.getTitle();
        expect(title).to.equal("OpenCart - Open Source Shopping Cart Solution", "Error: Title of the page is not matched");
    });
    When(/^I click on login link$/, function(){
        browser.click(locator.loginLink);
    });
    When(/^I tried to login with invalid credentials$/, function(){
        browser.waitForVisible(locator.username);
        browser.setValue(locator.username, "abcdefg");
        browser.setValue(locator.password, "abcdefg");
        browser.click(locator.loginButton);
    });
    Then(/^I verify the error message$/, function(){
        let html = browser.getHTML(locator.error, true);
        let myRegEx = /(Your(.*)\.)|(No(.*)\.)/g;
        let error = myRegEx.exec(html);
        if(error[0].includes("Your")){
            expect(error[0]).to.equal("Your account has exceeded allowed number of login attempts. Please try again in 1 hour.", "Error: Error message didn't match");    
        } else {
            expect(error[0]).to.equal("No match for E-Mail and/or Password.", "Error: Error message didn't match");
        }
        error.length=0;
    });
    Then(/^I close the browser$/, function(){
        // By default wdio closes the session. If we close it, the step in which the session
        // was closed will never pass
        // browser.close();
    });
});
