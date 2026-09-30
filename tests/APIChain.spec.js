const { test, expect } = require('@playwright/test');

import createBooking from '../payloadbody/Createbooking.json';
import updateBooking from '../payloadbody/Updatebooking.json';

let bookingId;
let tokenValue;

test.beforeAll(async ({ request }) => {

    // Create Booking

    const createResponse = await request.post(
        'https://restful-booker.herokuapp.com/booking',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            data: createBooking
        }
    );

    const createResponseBody = await createResponse.json();

    console.log('Created Booking Details:', createResponseBody);

    bookingId = createResponseBody.bookingid;

    console.log('Booking ID:', bookingId);

    // Create Token

    const tokenResponse = await request.post(
        'https://restful-booker.herokuapp.com/auth',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: 'admin',
                password: 'password123'
            }
        }
    );

    const tokenResponseBody = await tokenResponse.json();

    console.log('Token Response:', tokenResponseBody);

    tokenValue = tokenResponseBody.token;

    console.log('Token Value:', tokenValue);

});

test('Update Booking Details', async ({ request }) => {

    const updateResponse = await request.put(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${tokenValue}`
            },
            data: updateBooking
        }
    );

    const updateResponseBody = await updateResponse.json();

    console.log('Updated Booking Details:', updateResponseBody);

    expect(updateResponse.status()).toBe(200);

});

test('Delete Booking Details', async ({ request }) => {

    const deleteResponse = await request.delete(
        `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${tokenValue}`
            }
        }
    );

    console.log('Delete Status Code:', deleteResponse.status());

    expect(deleteResponse.status()).toBe(201);

});