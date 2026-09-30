const { test, expect } = require('@playwright/test');

test('Get Pet Details By Pet Id', async ({ request }) => {

    const petId = 10;

    const response = await request.get(
        `https://petstore.swagger.io/v2/pet/${petId}`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const responseBody = await response.json();

    console.log('Pet Details:', responseBody);

    await expect(response.status()).toBe(200);

    await expect(responseBody.id).toBe(petId);
});