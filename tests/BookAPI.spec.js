const { test, expect } = require('@playwright/test');

let bookId;
let response;

test.describe.serial('Books API', () => {

    test('Create New Book', async ({ request }) => {

        response = await request.post(
            'http://localhost:3000/Book',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    name: 'Harry Potter',
                    type: 'fiction',
                    available: true
                }
            }
        );

        const postResponseBody = await response.json();

        console.log('Created Book Details:', postResponseBody);

        bookId = postResponseBody.id;

        console.log('Book ID:', bookId);

        expect(response.status()).toBe(201);
    });

    test('Update Book Details', async ({ request }) => {

        response = await request.put(
            `http://localhost:3000/Book/${bookId}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    name: 'Oxford Dictionary',
                    type: 'non-fiction',
                    available: true
                }
            }
        );

        const updateResponseBody = await response.json();

        console.log('Updated Book Details:', updateResponseBody);

        expect(response.status()).toBe(200);
    });

    test('Get Book Details', async ({ request }) => {

        response = await request.get(
            `http://localhost:3000/Book/${bookId}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const getResponseBody = await response.json();

        console.log('Get Book Details:', getResponseBody);

        expect(response.status()).toBe(200);
    });

    test('Delete Book Details', async ({ request }) => {

        response = await request.delete(
            `http://localhost:3000/Book/${bookId}`
        );

        expect(response.status()).toBe(200);
    });

});