import { Component } from '@angular/core';

import { Link } from './link';

@Component({
    selector: 'app-about-citas',
    templateUrl: './about-citas.component.html',
    styleUrls: ['./about-citas.component.css']
})

export class AppAboutCitasComponent {
    menuItems:Link[] = [];

    constructor(){
        this.menuItems.push(new Link("/home", "Home"));
        
        this.menuItems.push(new Link("/about-citas", "About the Project"));
    }

}