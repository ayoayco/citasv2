import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';

import { SensorReading } from './models/sensor-reading';
import { Sensor } from './models/sensor';
import { Site } from './models/site';

@Component({
    selector: 'app-sensor-analysis',
    templateUrl: './sensor-analysis.component.html',
    styleUrls: ['./sensor-analysis.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class AppSensorAnalysisComponent {
    
    farms: Farm[] = [];
    selectedFarm: Farm = new Farm();
    sensors: Sensor[] = [];
    selectedSensorReadings: SensorReading[] = [];
    selectedSensorName: string = "";
    sites: Site[];

    constructor(
        private activeRoute: ActivatedRoute,
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ){
        let loggedIn: boolean = this.sessionService.isLoggedIn();
        if(!loggedIn){
            this.router.navigate(['/']);
        }else{
            this.titleService.setTitle('Soil Parameter Trends');
        }

        let data : any;
        
        this.sensors = [];
        this.selectedSensorReadings = undefined;
        this.selectedSensorName = "";

        let farm_id = undefined;
        this.activeRoute.params.forEach(
            (params : Params) => {
                farm_id = params["id"];
            }
        );

        this.apiService.getFarm(this.sessionService.getLoggedInKey(), farm_id.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                data = data.data[0];
                this.selectedFarm = data;

                this.apiService.getSites(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                .subscribe(
                    response => {
                        data = response;
                        data = JSON.parse(data._body);
                        this.sites = data.data;
                    }
                );

                this.apiService.getSensorList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                .subscribe(
                    res => {
                        data = res;
                        data = JSON.parse(data._body);
                        this.sensors = data.data;
                    }
                );

                this.apiService.getFarmList(this.sessionService.getLoggedInKey())
                .subscribe(
                    res => {
                        data = res;
                        data = JSON.parse(data._body);
                        
                        if(data.data){
                            this.farms = data.data;
                        }
                    }
                );
            }
        );
    }

    public selectFarm(id: number){
        
        let data: any;
        this.sensors = [];
        this.selectedSensorReadings = undefined;
        this.selectedSensorName = "";
        this.apiService.getFarm(this.sessionService.getLoggedInKey(), id.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                data = data.data[0];
                this.selectedFarm = data;

                //console.log('selected farm: ' + this.selectedFarm.farm_name);

                this.apiService.getSites(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                .subscribe(
                    response => {
                        data = response;
                        data = JSON.parse(data._body);
                        this.sites = data.data;
                        //console.log('sites!');
                        //console.log(this.sites);
                    }
                );

                this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                .subscribe(
                    res => {
                        data = res;
                        data = JSON.parse(data._body);
                        this.sensors = data.data;
                        //console.log("sensor count: "+this.sensors.length);
                        //console.log(this.sensors);
                    }
                );
            }
        );

    }
    public selectSensor(sensorID: string){
        //console.log('sensor '+ sensorID + ' selected!');
        let data: any;
        this.apiService.getSensor(this.sessionService.getLoggedInKey(), sensorID)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.selectedSensorReadings = data.data;
                this.selectedSensorName = sensorID;
                //console.log(this.selectedSensorReadings);
            }
        )
    }
}