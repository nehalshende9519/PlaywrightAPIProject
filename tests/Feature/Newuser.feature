Feature: Create a new user information into the GoRest API

Scenario: Create a new user with post request method

Given authorization type is bearer token

When I send a post request method with below payload body

"""
{
  "name":"Ganesh",
"gender":"male",
"email":"ganesh987654@gmail.com",
"status":"active"
}
"""

Then response status code should be 201

And the response body should include the name "Ganesh"