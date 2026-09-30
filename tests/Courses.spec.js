const { test, expect } = require('@playwright/test');

let courseId;
let response;

test.describe.serial('Courses API', () => {

    test('Create New Course', async ({ request }) => {

        response = await request.post(
            'http://localhost:3000/users',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    courseName: 'Playwright',
                    trainer: 'Ganesh',
                    duration: '12 Days'
                }
            }
        );

        const postResponseBody = await response.json();

        console.log('Created Course Details:', postResponseBody);

        courseId = postResponseBody.id;

        console.log('Course ID:', courseId);

        expect(response.status()).toBe(201);
    });

    test('Update Course Details', async ({ request }) => {

        response = await request.put(
            `http://localhost:3000/users/${courseId}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    courseName: 'API Testing with Playwright',
                    trainer: 'Nehal',
                    duration: '45 Days'
                }
            }
        );

        const updateResponseBody = await response.json();

        console.log('Updatehd Course Details:', updateResponseBody);

        expect(response.status()).toBe(200);
    });

    test('Get Course Details', async ({ request }) => {

        response = await request.get(
            `http://localhost:3000/users/${courseId}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const getResponseBody = await response.json();

        console.log('Course Details:', getResponseBody);

        expect(response.status()).toBe(200);
        expect(getResponseBody.id).toBe(courseId);
    });

    test('Delete Course Details', async ({ request }) => {

        response = await request.delete(
            `http://localhost:3000/users/${courseId}`
        );

        expect(response.status()).toBe(200);
    });

});
