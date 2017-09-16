import { Component, Input } from '@angular/core';
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
    farms: Farm[] = undefined;

    constructor(
        private apiService: CitasApiService,
        private sessionService: AppSessionService,
        private router: Router
    ) {
        let data: any;
        this.apiService.getFarmList(this.sessionService.getLoggedInKey())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.farms = data.data;
                for (let i = 0; i < this.farms.length; i++) {
                    this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.farms[i].farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.farms[i] = data.data[0];
                        }
                    );
                }
            }
        );
    }

    public display(farm_id: number) {
        this.sessionService.saveData('farm_id', farm_id.toString());
        this.router.navigate(['/']);
    }
}
