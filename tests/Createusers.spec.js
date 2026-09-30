const { test, expect } = require('@playwright/test');

test('Create User', async ({ request }) => {

    const res = await request.post(
        'http://localhost:3000/users',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                name: 'John',
                location: 'India',
                phone: '9923993944',
                courses: ['Java', 'Selenium']
            }
        }
    );

    const responseBody = await res.json();

    console.log(responseBody);

    expect(res.status()).toBe(201);

    expect(responseBody.name).toBe('John');
    expect(responseBody.location).toBe('India');
});