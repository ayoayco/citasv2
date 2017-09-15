import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSessionService } from './app.session.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: ['./app.component.css'],
    providers: [
        AppSessionService,
        Location,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ]
})

export class AppComponent implements OnInit {

    isLoggedIn: boolean;
    username: string;

    constructor(
        private router: Router,
        private sessionService: AppSessionService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.isLoggedIn = this.sessionService.isLoggedIn();
        let params = [];
        const path = this.location.path();

        params = path.split('/');
        switch (params[1]) {
            case 'reset-password':
            this.router.navigate(['/reset-password', params[2]]);break;
        }
    }

    onActivate(e, outlet) {
        outlet.scrollTop = 0;
    }

}
