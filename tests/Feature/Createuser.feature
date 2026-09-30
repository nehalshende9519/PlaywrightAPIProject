Feature: Create a new user details in Go REST API

Scenario: Create a new resource

When I send a post request method for creating a new user
Then the status code should be 201
And the username should be included "Ganesh"