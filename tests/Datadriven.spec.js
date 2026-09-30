const { test, expect } = require('@playwright/test');

import users from '../payloadbody/Multiplereqbody.json';

test('Multiple Request Body', async ({ request }) => {

    const tokenValue = 'cb1f59383e073764a5c4d87333ce468a4bb77bd3f2c03fa8262484c1f1651bd4';

    for (const user of users) {

        const response = await request.post(
            'https://gorest.co.in/public/v2/users',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenValue}`
                },
                data: user
            }
        );

        const postResponseBody = await response.json();

        console.log(
            'Created User Details = ',
            postResponseBody
        );

        expect(response.status()).toBe(201);
    }
});