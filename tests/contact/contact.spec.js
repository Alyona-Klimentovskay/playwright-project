import { test } from '@playwright/test';
import { ContactPage } from '../../lib/pages/ContactPage.js';
import { CONTACT_NEW_MESSAGE } from '../../lib/datafactory/dropDownMenuData.js';


test.describe('Contact Form Tests', () => {
    
    test('Should successfully send a contact message to support', async ({ page }) => {
        const contactPage = new ContactPage(page);
        await contactPage.navigate('/contact');
        await contactPage.sendMessage(CONTACT_NEW_MESSAGE);
        await contactPage.verifyMessageSentSuccessfully();
    });

});

