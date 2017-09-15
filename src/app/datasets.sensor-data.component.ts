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
    selector: 'sensor-data',
    templateUrl: './datasets.sensor-data.component.html',
    styleUrls: ['./datasets.sensor-data.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class DatasetsSensorDataComponent {
    farms: Farm[] = [];
    selectedFarm: Farm = new Farm();
    sensors: Sensor[] = [];
    selectedSensorReadings: SensorReading[] = [];
    selectedSensorName = '';
    sites: Site[];

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

        let data: any;
        this.sensors = [];
        this.selectedSensorReadings = undefined;
        this.selectedSensorName = '';

        const farm_id = this.sessionService.retriveData('farm_id');

        if (farm_id != null) {
            this.apiService.getFarm(this.sessionService.getLoggedInKey(), farm_id)
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    data = data.data[0];
                    this.selectedFarm = data;

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

                    this.apiService.getSensorList(
                        this.sessionService.getLoggedInKey(),
                        this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.sensors = data.data;
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
                        }
                    );

                    this.apiService.getSensorList(
                        this.sessionService.getLoggedInKey(),
                        this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.sensors = data.data;
                        }
                    );
                }
            );
        }
    }

    public selectFarm(id: number) {
        let data: any;
        this.sensors = [];
        this.selectedSensorReadings = undefined;
        this.selectedSensorName = '';
        this.sessionService.saveData('farm_id', id.toString());
        this.apiService.getFarm(this.sessionService.getLoggedInKey(), id.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                data = data.data[0];
                this.selectedFarm = data;

                // console.log('selected farm: ' + this.selectedFarm.farm_name);

                this.apiService.getSites(
                    this.sessionService.getLoggedInKey(),
                    this.selectedFarm.farm_id.toString())
                .subscribe(
                    response => {
                        data = response;
                        data = JSON.parse(data._body);
                        this.sites = data.data;
                        // console.log('sites!');
                        // console.log(this.sites);
                    }
                );

                this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                .subscribe(
                    response => {
                        data = res;
                        data = JSON.parse(data._body);
                        this.sensors = data.data;
                        // console.log('sensor count: '+this.sensors.length);
                        // console.log(this.sensors);
                    }
                );
            }
        );

    }
    public selectSensor(sensorID: string){
        // console.log('sensor '+ sensorID + ' selected!');
        let data: any;
        this.apiService.getSensor(this.sessionService.getLoggedInKey(), sensorID)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.selectedSensorReadings = data.data;
                this.selectedSensorName = sensorID;
                // console.log(this.selectedSensorReadings);
            }
        );
    }

    public onselect(val) {
        this.sensors = [];
        this.selectedSensorReadings = undefined;
        this.selectedSensorName = '';
        this.selectSite(val);
    }

    public selectSite(siteID: number) {
        let data: any;
        // console.log('selected site: ' + siteID)
        this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString(), siteID.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.sensors = data.data;
                // console.log('sensor count: '+this.sensors.length);
                // console.log(this.sensors);
            }
        );
    }

    public downloadSensor(){
        if (this.selectedSensorName !== '') {
            let data: any;
            this.apiService.getSensorCSVDownloadLink(this.sessionService.getLoggedInKey(), this.selectedSensorName)
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    window.open(data.dl_link, '_blank');
                }
            )
        }
    }
}
