import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Farm } from './models/farm';
import { Router } from '@angular/router';

@Component( {
    selector: 'view-farms',
    templateUrl: './view-farms.component.html',
    styleUrls: ['./view-farms.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class ViewFarmsComponent {
    farms: Farm[];
    constructor(
        private apiService: CitasApiService,
        private sessionService: AppSessionService,
        private router: Router
    ) {
        console.log('view farms');
        let data: any;
        this.apiService.getFarmList(this.sessionService.getLoggedInKey())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.farms = data.data;
                console.log(this.farms);
            }
        )
    }

    public display(farm_id: number) {
        this.sessionService.saveData('farm_id', farm_id.toString());
        this.router.navigate(['/']);
    }
}
