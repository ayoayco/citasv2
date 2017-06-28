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

        this.apiService.getFarmList(this.sessionService.getLoggedInKey())
        .then(
            res => {
                data = res;
                this.selectedFarm.farm_name = 'Loading...';
                if(data.data){
                    this.farms = data.data;

                    if(farm_id == undefined){
                        this.selectedFarm = this.farms[0];
                    }else{
                        let selectedArr = $.grep(this.farms, function(e){ return e.farm_id == farm_id });
                        this.selectedFarm = selectedArr[0];
                    }

                    console.log('selected farm: ' + this.selectedFarm.farm_name);

                    this.apiService.getSites(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .then(
                        response => {
                            data = response;
                            this.sites = data.data;
                            console.log('sites!');
                            console.log(this.sites);
                        }
                    );

                    this.apiService.getSensorList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .then(
                        res => {
                            data = res;
                            this.sensors = data.data;
                            console.log("sensor count: "+this.sensors.length);
                            console.log(this.sensors);
                        }
                    );

                }
                //console.log(this.farms);
            }
        );
    }

    public selectFarm(id: number){
        
        this.sensors = [];
        this.selectedSensorReadings = undefined;
        this.selectedSensorName = "";
        let selectedArr = $.grep(this.farms, function(e){ return e.farm_id == id });
        this.selectedFarm = selectedArr[0];

        let data: any;

        console.log('selected farm: ' + this.selectedFarm.farm_name);

        this.apiService.getSites(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
        .then(
            response => {
                data = response;
                this.sites = data.data;
                console.log('sites!');
                console.log(this.sites);
            }
        );

        this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
        .then(
            res => {
                data = res;
                this.sensors = data.data;
                console.log("sensor count: "+this.sensors.length);
                console.log(this.sensors);
            }
        );

    }
    public selectSensor(sensorID: string){
        console.log('sensor '+ sensorID + ' selected!');
        let data: any;
        this.apiService.getSensor(this.sessionService.getLoggedInKey(), sensorID)
        .then(
            res => {
                data = res;
                this.selectedSensorReadings = data.data;
                this.selectedSensorName = sensorID;
                console.log(this.selectedSensorReadings);
            }
        )
    }

    public onselect(val){
        this.sensors = [];
        this.selectedSensorReadings = undefined;
        this.selectedSensorName = "";
        this.selectSite(val);
    }

    public selectSite(siteID: number){
        let data: any;
        console.log('selected site: ' + siteID)
        this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString(), siteID.toString())
        .then(
            res => {
                data = res;
                this.sensors = data.data;
                console.log("sensor count: "+this.sensors.length);
                console.log(this.sensors);
            }
        );
    }

    public downloadSensor(){
        if(this.selectedSensorName != ""){
            let data: any;
            this.apiService.getSensorCSVDownloadLink(this.sessionService.getLoggedInKey(), this.selectedSensorName)
            .then(
                res => {
                    data = res;
                    console.log(data);
                    window.open(data.dl_link, '_blank');
                }
            )
        }
    }
}