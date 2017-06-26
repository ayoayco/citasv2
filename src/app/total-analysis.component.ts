import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';

import { SensorReading } from './models/sensor-reading';
import { Sensor } from './models/sensor';
import { Site } from './models/site';
import { Plant } from './models/plant';
import { PlantAnalysis } from './models/plant-analysis';

@Component({
    selector: 'app-total-analysis',
    templateUrl: './total-analysis.component.html',
    styleUrls: ['./total-analysis.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class AppTotalAnalysisComponent {
    
    farms: Farm[] = [];
    selectedFarm: Farm = new Farm();
    sensors: Sensor[] = [];
    selectedSensorReadings: SensorReading[] = [];
    selectedSensorName: string = "";
    plants: Plant[] = [];
    selectedPlant: Plant = new Plant();
    sites: Site[];
    resize: number;
    plantAnalysis: PlantAnalysis;

    showSites: boolean;
    showSensors: boolean;
    showPlants: boolean;
    showSamplings: boolean;

    constructor(
        private activeRoute: ActivatedRoute,
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ){

        this.plantAnalysis = new PlantAnalysis();

        this.showPlants = true;
        this.showSamplings = true;
        this.showSensors = true;
        this.showSites = true;

        this.resize = 0;

        let loggedIn: boolean = this.sessionService.isLoggedIn();
        if(!loggedIn){
            this.router.navigate(['/']);
        }else{
            this.titleService.setTitle('Total Analysis');
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
                        }
                    );

                    this.apiService.getSensorList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .then(
                        res => {
                            data = res;
                            this.sensors = data.data;
                        }
                    );

                    this.apiService.getPlantList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .then(
                        res => {
                            data = res;
                            this.plants = data.data;
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

        this.apiService.getPlantList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
        .then(
            res => {
                data = res;
                this.plants = data.data;
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

    public onMapResize(){
        this.resize++;
        console.log('map resize');
    }

    public toggleSites(){
        this.showSites = !this.showSites;
    }

    public togglePlants(){
        this.showPlants = !this.showPlants;
    }

    public toggleSensors(){
        this.showSensors = !this.showSensors;
    }

    public toggleSamplings(){
        this.showSamplings = !this.showSamplings;
    }

    public togglePlantAnalysis(){
        let data: any;
        if(this.selectedPlant){
            this.apiService.getPlantAnalysis(this.sessionService.getLoggedInKey(), this.selectedPlant.plant_id)
            .then(
                res => {
                    data = res.data;
                    this.plantAnalysis = data;
                    console.log(this.plantAnalysis);
                    $('#plantAnalysisModal').modal('toggle');
                }
            )
        }

    }

    public selectPlant(plantID: string){
        console.log('Plant '+ plantID + ' selected!');
        let data: any;
        this.apiService.getPlant(this.sessionService.getLoggedInKey(), plantID)
        .then(
            res => {
                data = res;
                console.log(data);
                this.selectedPlant = data.data;
                this.togglePlantAnalysis();
                //console.log(this.selectedPlant);
            }
        )
    }
}