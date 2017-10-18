import { Component, AfterViewInit } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { CitasApiService } from './citas.api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'update-team',
    templateUrl: './update-team.component.html',
    styleUrls: ['./update-team.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class UpdateTeamComponent implements AfterViewInit{
    teams: any[];

    constructor(
        private apiService: CitasApiService, 
        private router: Router,
        private titleService: Title,
        private sessionService: AppSessionService
    ) {
        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn) {
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('Update Team');
        }

        let data;

        this.apiService.getTeamList()
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.teams = data.data;
                console.log(this.teams);
            }
        )
   }
   ngAfterViewInit() {
        $('[data-toggle="tooltip"]').tooltip(); 
   }
}