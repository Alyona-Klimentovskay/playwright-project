
export class UserFormFields {
    constructor(page) {
        this.page = page; 
        this.firstNameInput = page.getByTestId('first-name');
        this.lastNameInput = page.getByTestId('last-name');
        this.emailInput = page.getByTestId('email');
    }

    async fillPersonalData(testData) {
        await this.firstNameInput.fill(testData.firstName);
        await this.lastNameInput.fill(testData.lastName);
        await this.emailInput.fill(testData.email);
    }

}


