const { When, Then } = require('@cucumber/cucumber');
const { expect, request } = require('@playwright/test');

let response;
let responseBody;

When('I send a get request method to gorestapi', async function () {

    const apiRequest = await request.newContext();

    response = await apiRequest.get(
        'https://gorest.co.in/public/v2/users',
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    responseBody = await response.json();

    console.log(responseBody);
});

Then('the response status code should be {int}', async function (expectedStatusCode) {

    expect(response.status()).toBe(expectedStatusCode);

});

Then('the response should include the name {string}', async function (expectedName) {

    const actualName = responseBody[0].name;

    console.log(actualName);

    expect(actualName).toBe(expectedName);

});

Then('the response should include the email {string}', async function (expectedEmail) {

    const actualEmail = responseBody[0].email;

    console.log(actualEmail);

    expect(actualEmail).toBe(expectedEmail);

});