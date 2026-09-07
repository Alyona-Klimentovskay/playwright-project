import { AbstractPage } from '../../lib/pages/AbstractPage.js';
import { UserFormFields } from '../../lib/components/userFormFields.js';


export class CustomerRegistrationPage extends AbstractPage{
    constructor(page) {
        super(page);
        this.registerlink = page.getByTestId('register-link');
        this.userForm = new UserFormFields(page);
        this.dobInput = page.getByTestId('dob');
        this.countryDropDown = page.getByTestId('country');
        this.zipeCodeInput = page.getByTestId('postal_code');
        this.houseNumberInput = page.getByTestId('house_number');
        this.streetnameInput = page.getByTestId('street');
        this.citynameInput = page.getByTestId('city');
        this.statenameInput = page.getByTestId('state');
        this.phoneInput = page.getByTestId('phone');
        this.passwordInput = page.getByTestId('password');
        this.registersubmitBtn = page.getByTestId('register-submit');
        
    }

    async navigateToRegisterForm() {
        await this.navMenu.clickSignIn();
        await this.registerlink.click();
    }

    async fillRegistrationForm(testData) {
        await this.userForm.firstNameInput.waitFor({ state: 'visible' });
        await this.userForm.fillPersonalData(testData);
        await this.dobInput.fill(testData.dob);
        await this.countryDropDown.selectOption(testData.country);
        await this.zipeCodeInput.fill(testData.zipeCode);
        await this.houseNumberInput.fill(testData.houseNumber);
        await this.streetnameInput.fill(testData.streetName);
        await this.citynameInput.fill(testData.cityName);
        await this.statenameInput.fill(testData.stateName);
        await this.phoneInput.fill(testData.phone);
        await this.passwordInput.fill(testData.password);
        await this.registersubmitBtn.click();     

    }


}