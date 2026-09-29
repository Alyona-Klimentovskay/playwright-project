import { test, expect } from '@playwright/test';
import { UserController } from  '../../lib/api/userController.js';


test.describe('User API Requests', () => {
    let userController;

    test.beforeEach(({ request }) => { 
        userController = new UserController(request);
    });

    
    test('User should successfully register, login and get profile', async () => {
        const uniqueId = Date.now();
        const uniqueEmail = 'user_' + uniqueId + '@example.com';
        const testPassword = 'Pass_' + uniqueId + '@Secure!';
        
        const registerPayload = {
            first_name: 'Ivan',
            last_name: 'Ivanov',
            dob: '1987-01-01',
            phone: '0987654321',
            email: uniqueEmail,
            password: testPassword,
            address: {
                street: 'Test Street',
                house_number: '12',
                city: 'Berlin',
                state: 'Berlin',
                country: 'Germany',
                postal_code: '10115AA'
            }
        };

        const registerResponse = await userController.register(registerPayload);
        expect(registerResponse.status()).toBe(201);

        const loginCredentials = {
            email: uniqueEmail,
            password: testPassword
        };

        const loginResponse = await userController.login(loginCredentials);
        expect(loginResponse.status()).toBe(200);
        const loginBody = await loginResponse.json();
        const token = loginBody.access_token;
        expect(token).toBeDefined();
        userController.setToken(token);

        const profileResponse = await userController.getCurrentProfile();
        expect(profileResponse.status()).toBe(200);
        const profileBody = await profileResponse.json();
        expect(profileBody.email).toBe(uniqueEmail);
        expect(profileBody.first_name).toBe('Ivan');
        
    });

    test('Should return 401 when fetching profile without token', async () => {
    const response = await userController.getCurrentProfile();
    expect(response.status()).toBe(401);
    
    });

})


