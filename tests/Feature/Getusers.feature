Feature: Get user details from Gorest api

Scenario: Get all the user details

When I send a get request method to gorestapi
Then the response status code should be 200
And the response should include the name "Chatura Somayaji"
And the response should include the email "somayaji_chatura@casper.example"