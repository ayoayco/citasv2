import { Component, Input } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Farm } from './models/farm';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    plants: any = {};
    sensors: any = {};
    sites: any = {}
    user_type: number;

    constructor(
        private apiService: CitasApiService,
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title
    ) {
        this.user_type = this.sessionService.getLoggedInUserType();
        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn){
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('Dashboard');
        }

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
                            this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.farms[i].farm_id.toString())
                            .subscribe(
                                result => {
                                    data = result;
                                    data = JSON.parse(data._body);
                                    const plant = data.data;
                                    this.plants[this.farms[i].farm_id] = plant;
                                }
                            );
                            this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.farms[i].farm_id.toString())
                            .subscribe(
                                result => {
                                    data = result;
                                    data = JSON.parse(data._body);
                                    const sensor = data.data;
                                    this.sensors[this.farms[i].farm_id] = sensor;
                                    console.log(this.sensors);
                                }
                            );
                             this.apiService.getSites(this.sessionService.getLoggedInKey(), this.farms[i].farm_id.toString())
                            .subscribe(
                                result => {
                                    data = result;
                                    data = JSON.parse(data._body);
                                    const site = data.data;
                                    this.sites[this.farms[i].farm_id] = site;
                                }
                            );

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
