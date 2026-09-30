const { Given, When, Then } = require("@cucumber/cucumber");
const { request, expect } = require("@playwright/test");

let APIRequest;
let response;

const TokenValue = "cb1f59383e073764a5c4d87333ce468a4bb77bd3f2c03fa8262484c1f1651bd4";

Given(
'I set authorization with bearer token value',
async function () {

    APIRequest = await request.newContext();

});

When(
'i send post request body with valid user details {string} {string} {string} {string}',
async function (name, email, gender, status) {

    const UniqueEmail =
        `${Date.now()}_${email}`;

    const RequestBody = {

        name,
        email: UniqueEmail,
        gender,
        status

    };

    response = await APIRequest.post(
        "https://gorest.co.in/public/v2/users",
        {
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${TokenValue}`

            },

            data: RequestBody

        }
    );

    const ResponseBody = await response.json();

    console.log(
        "Valid User Response = ",
        ResponseBody
    );

});

When(
'i send post request body with invalid user details {string} {string} {string} {string}',
async function (name, email, gender, status) {

    const RequestBody = {

        name,
        email,
        gender,
        status

    };

    response = await APIRequest.post(
        "https://gorest.co.in/public/v2/users",
        {
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${TokenValue}`

            },

            data: RequestBody

        }
    );

    const ResponseBody = await response.json();

    console.log(
        "Invalid User Response = ",
        ResponseBody
    );

});

Then(
'the response status code should be for valid {string}',
async function (statuscode) {

    const ExpectedStatusCode =
        Number(statuscode);

    await expect(
        response.status()
    ).toBe(ExpectedStatusCode);

});

Then(
'the response status code should be for invalid {string}',
async function (statuscode) {

    const ExpectedStatusCode =
        Number(statuscode);

    await expect(
        response.status()
    ).toBe(ExpectedStatusCode);

});