const { test, expect } = require('@playwright/test');

test('Get user details from JSON Server', async ({ request }) => {

    const response = await request.get(
        'http://localhost:3000/users',
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const getResponseBody = await response.json();

    console.log(
        'Get User Details = ',
        getResponseBody
    );
    expect(response.status()).toBe(200);

});