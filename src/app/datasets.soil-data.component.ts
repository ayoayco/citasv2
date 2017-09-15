import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';

import { SensorReading } from './models/sensor-reading';
import { Sensor } from './models/sensor';
import { Site } from './models/site';

@Component({
    selector: 'soil-data',
    templateUrl: './datasets.soil-data.component.html',
    styleUrls: ['./datasets.soil-data.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class DatasetsSoilDataComponent {
    farms: Farm[] = [];
    selectedFarm: Farm = new Farm();
    soilChar: any;
    samplings: any;

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
            this.titleService.setTitle('Collected Sensor Data');
        }

        this.soilChar = undefined;

        let data: any;

        const farm_id = this.sessionService.retriveData('farm_id');

        if (farm_id != null) {
            this.apiService.getFarm(this.sessionService.getLoggedInKey(), farm_id)
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    data = data.data[0];
                    this.selectedFarm = data;

                    this.apiService.getSamplingsGeoJSON(this.selectedFarm.farm_id)
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.samplings = data;
                            this.soilChar = [];
                            for (let i = 0; i < this.samplings.features.length; i++) {
                                this.soilChar.push(this.samplings.features[i].properties);
                            }
                            console.log(this.soilChar);
                        },
                        err => {
                            console.error(err);
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
                            data = res;
                            data = JSON.parse(data._body);
                            data = data.data[0];
                            this.selectedFarm = data;
                            this.apiService.getSamplingsGeoJSON(this.selectedFarm.farm_id)
                            .subscribe(
                                r => {
                                    data = r;
                                    data = JSON.parse(data._body);
                                    this.samplings = data;
                                    this.soilChar = [];
                                    for (let i = 0; i < this.samplings.features.length; i++) {
                                        this.soilChar.push(this.samplings.features[i].properties);
                                    }
                                    console.log(this.soilChar);
                                },
                                err => {
                                    console.error(err);
                                }
                            );

                        }
                    );
                }
            );
        }
    }

    public selectFarm(id: number) {
        let data: any;
        this.soilChar = undefined;
        this.sessionService.saveData('farm_id', id.toString());
        this.apiService.getFarm(this.sessionService.getLoggedInKey(), id.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                data = data.data[0];
                this.selectedFarm = data;

                this.apiService.getSamplingsGeoJSON(this.selectedFarm.farm_id)
                .subscribe(
                    response => {
                        data = response;
                        data = JSON.parse(data._body);
                        this.samplings = data;
                        this.soilChar = [];
                        for (let i = 0; i < this.samplings.features.length; i++) {
                            this.soilChar.push(this.samplings.features[i].properties);
                        }
                        console.log(this.soilChar);
                    },
                    err => {
                        console.error(err);
                    }
                );

            }
        );

    }
}
