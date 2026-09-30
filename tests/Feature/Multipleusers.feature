Feature: performing datadriven approch

Scenario Outline: Create a multiple request body

Given I set authorization  with bearer token value

When i send post request method with "<name>" "<email>" "<gender>" "<status>"

Then the response status code for all users is 201

Examples:

|name|email|gender|status|
|john|john_mik3223@gmail.com|male|active|
|lisa|lisa_marrry22343@gmail.com|female|active|
|harry|harry_max4224@gmail.com|male|active|