import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'update-events',
    templateUrl: './update-events.component.html',
    styleUrls: ['./update-events.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class UpdateEventsComponent {
    events: any[];

    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService,
        private router: Router,
        private titleService: Title
    ) {
        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn) {
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('Update Event List');
        }

        let data;

        this.apiService.getEvents()
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.events = data.data;
                console.log(this.events);
            }
        )

    }
}
