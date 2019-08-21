Feature: Play with open cart

Scenario: Having fun with oper cart
    Given I launch opencart url
    Then I verify title
    When I click on login link
    When I tried to login with invalid credentials
    Then I verify the error message
    Then I close the browser
