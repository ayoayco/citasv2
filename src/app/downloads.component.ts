import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';
import { Site } from './models/site';

@Component({
    selector: 'downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class DownloadsComponent {
    farms: Farm[] = [];
    selectedFarm: Farm = new Farm();
    sites: Site[];
    plantDates: any;
    sensorDates: any;

    constructor(
        private activeRoute: ActivatedRoute,
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ) {

        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn) {
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('Downloads');
        }

        let data: any;

        const farm_id = this.sessionService.retriveData('farm_id');

        if(farm_id != null){
            this.apiService.getFarm(this.sessionService.getLoggedInKey(), farm_id.toString())
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    data = data.data[0];
                    this.selectedFarm = data;

                    this.apiService.getAvailableDates(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.plantDates = {
                                minDate : data.date_range_image.date_from,
                                maxDate : data.date_range_image.date_to
                            }
                            this.sensorDates = {
                                minDate : data.date_range_sensor.date_from,
                                maxDate : data.date_range_sensor.date_to
                            }
                        }
                    )

                    this.apiService.getSites(
                        this.sessionService.getLoggedInKey(),
                        this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.sites = data.data;
                        }
                    );

                    this.apiService.getFarmList(this.sessionService.getLoggedInKey())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            if (data.data) {
                                this.farms = data.data;
                            }
                        }
                    );
                }
            );
        } else {
            this.apiService.getFarmList(this.sessionService.getLoggedInKey())
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    this.farms = data.data;
                    if (this.farms.length === 0) {
                        // no farms yet, navigate to add new farm
                        this.router.navigate(['/register-farm']);
                    }

                    this.selectedFarm = this.farms[0];
                    this.sessionService.saveData('farm_id', this.selectedFarm.farm_id.toString());
                    this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            data = data.data[0];
                            this.selectedFarm = data;
                        }
                    );

                    this.apiService.getAvailableDates(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.plantDates = {
                                minDate : data.date_range_image.date_from,
                                maxDate : data.date_range_image.date_to
                            }
                            this.sensorDates = {
                                minDate : data.date_range_sensor.date_from,
                                maxDate : data.date_range_sensor.date_to
                            }
                        }
                    )

                    this.apiService.getSites(
                        this.sessionService.getLoggedInKey(),
                        this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.sites = data.data;
                        }
                    );


                }
            );
        }
    }

    public selectFarm(id: number) {
        let data: any;
        this.sessionService.saveData('farm_id', id.toString());
        this.apiService.getFarm(this.sessionService.getLoggedInKey(), id.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                data = data.data[0];
                this.selectedFarm = data;

                // console.log('selected farm: ' + this.selectedFarm.farm_name);

                    this.apiService.getAvailableDates(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.plantDates = {
                                minDate : data.date_range_image.date_from,
                                maxDate : data.date_range_image.date_to
                            }
                            this.sensorDates = {
                                minDate : data.date_range_sensor.date_from,
                                maxDate : data.date_range_sensor.date_to
                            }
                        }
                    )

                    this.apiService.getSites(
                        this.sessionService.getLoggedInKey(),
                        this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.sites = data.data;
                        }
                    );
            }
        );
    }
}
