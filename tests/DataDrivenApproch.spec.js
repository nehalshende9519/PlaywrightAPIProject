const { test, expect } = require('@playwright/test');

import users from '../payloadbody/Multiplerequestbody.json';

for (const user of users) {

    test(user.caseName, async ({ request }) => {

        const response = await request.post(
            'https://lkmdemoaut.accenture.com/AccenSportzRestApi/addNewUser',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: user.payload
            }
        );

        const responseText = await response.text();

        console.log('Test Case:', user.CaseName);
        console.log('Status Code:', response.status());
        console.log('Response:', responseText);

        expect(response.status()).toBe(
            user.expectedstatuscode
        );
    });

}