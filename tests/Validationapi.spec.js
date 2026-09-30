const { test, expect } = require('@playwright/test');

test('Validate Add Pet API', async ({ request }) => {

    // Capture Start Time
    const startTime = Date.now();

    // Add Pet Request
    const response = await request.post(
        'https://petstore.swagger.io/v2/pet',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id: Date.now(),
                category: {
                    id: 1,
                    name: 'Dogs'
                },
                name: 'Tommy',
                photoUrls: [
                    'https://test.com/dog.jpg'
                ],
                tags: [
                    {
                        id: 1,
                        name: 'Pet'
                    }
                ],
                status: 'available'
            }
        }
    );

    // Response Time
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log('Response Time:', responseTime);

    // Status Code
    console.log('Status Code:', response.status());

    // Response Body
    const responseBody = await response.json();

    console.log('Response Body:', responseBody);

    // Headers
    const headersInfo = response.headers();

    console.log('Headers:', headersInfo);

    // Assertions

    // Response Time
    expect(responseTime).toBeLessThan(5000);

    // Status Code
    expect(response.status()).toBe(200);

    // Response Body
    expect(responseBody).toHaveProperty('name', 'Tommy');
    expect(responseBody).toHaveProperty('status', 'available');

    // Headers
    expect(headersInfo['content-type']).toContain('application/json');
});