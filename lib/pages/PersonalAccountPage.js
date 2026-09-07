import { AbstractPage } from '../../lib/pages/AbstractPage.js';


export class PersonalAccountPage extends AbstractPage {
    constructor(page) {
        super(page);
        this.myAccountHeading = page.getByRole('heading', { name: 'My Account' });
        this.updateProfileBtn = page.getByTestId('update-profile-submit');

    }

    async checkMyAccountPageIsLoaded() {
        await this.myAccountHeading.waitFor({ state: 'visible' });
    }

}


