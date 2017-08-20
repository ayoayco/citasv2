import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';

@Component({
    selector: 'app-about-team',
    templateUrl: './about-team.component.html',
    styleUrls: ['./about-team.component.css'],
    providers: [
        CitasApiService
    ]
})

export class AppAboutTeamComponent {
    teams: any[];
    constructor(
        private apiService: CitasApiService
    ) {
        let data: any;
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
}
