const { When, Then } = require('@cucumber/cucumber');
const { request, expect } = require('@playwright/test');

let response;
let responseBody;

const token =
'cb1f59383e073764a5c4d87333ce468a4bb77bd3f2c03fa8262484c1f1651bd4';

When('I send a post request method for creating a new user', async function () {

    const apiRequest = await request.newContext();

    response = await apiRequest.post(
        'https://gorest.co.in/public/v2/users',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            data: {
                name: 'Ganesh',
                gender: 'male',
                email: `ganesh${Date.now()}@gmail.com`,
                status: 'active'
            }
        }
    );

    responseBody = await response.json();

    console.log('Create User Details = ', responseBody);
});

Then('the status code should be {int}', async function (expectedStatusCode) {

    expect(response.status()).toBe(expectedStatusCode);

});

Then('the username should be included {string}', async function (expectedName) {

    const actualName = responseBody.name;

    console.log('Actual Name = ', actualName);

    expect(actualName).toBe(expectedName);

});