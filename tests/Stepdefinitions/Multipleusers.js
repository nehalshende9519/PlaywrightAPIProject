const { Given, When, Then } = require("@cucumber/cucumber");
const { request, expect } = require("@playwright/test");

let APIRequest;
let response;

const TokenValue = "cb1f59383e073764a5c4d87333ce468a4bb77bd3f2c03fa8262484c1f1651bd4";

Given(
'I set authorization  with bearer token value',
async function () {

    APIRequest = await request.newContext();

});

When(
'i send post request method with {string} {string} {string} {string}',
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

    const PostResponseBody = await response.json();

    console.log(
        "Created User Details Is = ",
        PostResponseBody
    );

});

Then(
'the response status code for all users is {int}',
async function (ExpectedStatusCode) {

    await expect(
        response.status()
    ).toBe(ExpectedStatusCode);

});