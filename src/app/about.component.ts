import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class AboutComponent {

    constructor(
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ) {

        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn) {
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('About PCARI-CITAS');
        }
    }
}
