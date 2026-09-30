Feature: GoRest API Request Body Data Driven Approach

Background:

Given I set authorization with bearer token value

Scenario Outline: Create a user with valid request body

When i send post request body with valid user details "<name>" "<email>" "<gender>" "<status>"

Then the response status code should be for valid "<statuscode>"

Examples:

|name|email|gender|status|statuscode|
|john|john@gmail.com|male|active|201|
|lisa|lisa@gmail.com|female|active|201|


Scenario Outline: Create a user with invalid request body

When i send post request body with invalid user details "<name>" "<email>" "<gender>" "<status>"

Then the response status code should be for invalid "<statuscode>"

Examples:

|name|email|gender|status|statuscode|
|john||male|active|422|
|lisa|invalid-email|female|active|422|