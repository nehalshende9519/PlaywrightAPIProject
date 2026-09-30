const { test, expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker');
const { DateTime } = require('luxon');

test('Random Booking details', async ({ request }) => {

    const fname = faker.person.firstName();
    const lname = faker.person.lastName();
    const price = faker.number.int(1000);
    const deposit = faker.datatype.boolean();
    const checkin = DateTime.now().toFormat('yyyy-MM-dd');
    const checkout = DateTime.now().plus({ day: 3 }).toFormat('yyyy-MM-dd');
    const breakfast = faker.food.ethnicCategory();

    const response = await request.post(
        'https://restful-booker.herokuapp.com/booking',
        {
            headers: {
                'Content-Type': 'application/json'
            },

            data: {
                "firstname": fname,
                "lastname": lname,
                "totalprice": price,
                "depositpaid": deposit,

                "bookingdates": {
                    "checkin": checkin,
                    "checkout": checkout
                },

                "additionalneeds": breakfast
            }
        }
    )

    const postresponsebody = await response.json();

    console.log('created booking details is=', postresponsebody)

    const Bookingidvalue = await postresponsebody.bookingid

    console.log('the booking id value is=', Bookingidvalue)

    await expect(response.status()).toBe(200)

    await expect(postresponsebody.booking)
        .toHaveProperty("firstname", fname)

    await expect(postresponsebody.booking)
        .toHaveProperty("lastname", lname)

})
