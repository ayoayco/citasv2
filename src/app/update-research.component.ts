import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'update-research',
    templateUrl: './update-research.component.html',
    styleUrls: ['./update-research.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class UpdateResearchComponent {
    researches: any[];

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
            this.titleService.setTitle('Update Team');
        }

        let data;

        this.apiService.getResearch()
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.researches = data.data;
                console.log(this.researches);
            }
        )

    }
}
