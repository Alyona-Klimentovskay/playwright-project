import { expect } from '@playwright/test';
import { AbstractPage } from '../../lib/pages/AbstractPage.js';

export class LoginPage extends AbstractPage{
    constructor(page) {
        super(page);
        this.emailField = page.getByTestId('email');
        this.passwordField = page.getByTestId('password');
        this.loginSubmitBtn = page.getByTestId('login-submit');
               
    }

    async customerLogin(email, password) {
        await this.emailField.waitFor({ state: 'visible' });
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginSubmitBtn.click();
               
    }

    async adminLogin(email = process.env.ADMIN_EMAIL, password = process.env.ADMIN_PASSWORD) {
        await this.emailField.waitFor({ state: 'visible' });
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginSubmitBtn.click();        
        
        
        
    }

    
}