const { test, expect } = require('@playwright/test');

const createuser = require('../payloadbody/Createuser.json');
const updateuser = require('../payloadbody/updateuser.json');

test.describe.serial('Test Gorest api', function () {

    var tokenvalue = 'cb1f59383e073764a5c4d87333ce468a4bb77bd3f2c03fa8262484c1f1651bd4';
    var response;
    var idvalue;

    test('Create a new user', async ({ request }) => {

        response = await request.post(
            'https://gorest.co.in/public/v2/users',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenvalue}`
                },

                data: createuser
            }
        );

        const postresponsebody = await response.json();

        console.log('Create new user details:', postresponsebody);

        expect(response.status()).toBe(201);

        expect(postresponsebody.name).toBe(createuser.name);
        expect(postresponsebody.email).toBe(createuser.email);

        idvalue = postresponsebody.id;

        console.log('ID Value:', idvalue);
    });

    test('Update the user details', async ({ request }) => {

        response = await request.put(
            `https://gorest.co.in/public/v2/users/${idvalue}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenvalue}`
                },

                data: updateuser
            }
        );

        const updatedresponsebody = await response.json();

        console.log('Updated user details:', updatedresponsebody);

        expect(response.status()).toBe(200);
    });

    test('Get user details', async ({ request }) => {

        response = await request.get(
            `https://gorest.co.in/public/v2/users/${idvalue}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenvalue}`
                }
            }
        );

        const getresponsebody = await response.json();

        console.log('Get user details:', getresponsebody);

        expect(response.status()).toBe(200);
        expect(getresponsebody.id).toBe(idvalue);
    });

});
