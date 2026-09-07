import { NavMenuComponent } from '../../lib/components/navMenu.js';


export class AbstractPage {
    constructor(page) {
        this.page = page;
        this.navMenu = new NavMenuComponent(page);
       
    }

    async navigate(path = '') {
        await this.page.goto(path);       
    }

     
}    

