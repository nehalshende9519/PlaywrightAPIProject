const { Given, When, Then } = require('@cucumber/cucumber');
const { he } = require('@faker-js/faker');
const { expect, request } = require('@playwright/test');

var apirequest;
var tokenvalue = "cb1f59383e073764a5c4d87333ce468a4bb77bd3f2c03fa8262484c1f1651bd4";
var response;

Given('authorization type is bearer token', async function () {

    apirequest = await request.newContext();

});

When('I send a post request method with below payload body', async function (payloadbody) {

    const requestbody = JSON.parse(payloadbody);

    response = await apirequest.post(
        'https://gorest.co.in/public/v2/users',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenvalue}`
            },

            data: requestbody
        }
    );

    const postresponsebody = await response.json();

    console.log('created a new user details is =', postresponsebody);

});

Then('response status code should be {int}', async function (expectedstatuscode) {

    await expect(response.status()).toBe(expectedstatuscode);

});

Then('the response body should include the name {string}', async function (expectedname) {

    const responsebody = await response.json();

    const actualname = await responsebody.name;

    await expect(actualname).toBe(expectedname);

});