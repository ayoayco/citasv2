import { Component } from '@angular/core';

import { Link } from './link';

@Component({
    selector: 'app-about-team',
    templateUrl: './about-team.component.html',
    styleUrls: ['./about-team.component.css']
})

export class AppAboutTeamComponent {
    menuItems: Link[] = [];

    constructor(){
        this.menuItems.push(new Link("/home", "Home"));
        
        this.menuItems.push(new Link("/about-team", "About the Team"));
    }
}