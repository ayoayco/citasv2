import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';

@Component({
    selector: 'user-nav',
    templateUrl: './user.nav.component.html',
    styleUrls: ['./user.nav.component.css'],
    providers: [
        AppSessionService
    ]
})

export class UserNavComponent {
    constructor(
        private sessionService: AppSessionService
    ){
        
    }
}