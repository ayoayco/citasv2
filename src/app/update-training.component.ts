import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'update-training',
    templateUrl: './update-training.component.html',
    styleUrls: ['./update-training.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class UpdateTrainingComponent {
    trainings: any[];

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

        this.apiService.getTrainings()
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.trainings = data.data;
                console.log(this.trainings);
            }
        )

    }
}
