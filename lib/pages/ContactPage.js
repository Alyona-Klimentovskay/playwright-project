import { expect } from '@playwright/test';
import { AbstractPage } from '../../lib/pages/AbstractPage.js';
import { UserFormFields } from '../../lib/components/userFormFields.js';


export class ContactPage extends AbstractPage {
    constructor(page) {
        super(page); 
        this.userForm = new UserFormFields(page);   
        this.subjectSelect = page.getByTestId('subject');
        this.messageTextArea = page.getByTestId('message');
        this.contactSubmitBtn = page.getByTestId('contact-submit');
        this.successAlert = page.getByRole('alert');
    }

    async selectSubject(subjectValue) {
        await this.subjectSelect.selectOption(subjectValue);
    }

    async sendMessage(testData) {
        await this.userForm.fillPersonalData(testData);
        await this.subjectSelect.selectOption(testData.subject);
        await this.messageTextArea.fill(testData.message);
        await this.contactSubmitBtn.click();
    }

    async verifyMessageSentSuccessfully() {
        await expect(this.successAlert).toHaveText('Thanks for your message! We will contact you shortly.');
    }



}