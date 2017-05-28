import { Component, Input } from '@angular/core';

import { Link } from './link';

@Component({
    selector: 'app-nav-pages',
    templateUrl: './nav.pages.component.html',
    styleUrls: ['./nav.pages.component.css']
})

export class AppNavPagesComponent {
    @Input() menuItems: Link[] = [];

    constructor(){
        this.menuItems.push(new Link("/", "Home"));
    }
}