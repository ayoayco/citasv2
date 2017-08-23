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
    zoomTo: number[] = undefined;
    farms: Farm[] = [];
    selectedFarm: Farm = new Farm();
    sensors: Sensor[] = [];
    selectedSensorReadings: SensorReading[] = [];
    selectedSensorName = '';
    plants: Plant[] = [];
    selectedPlant: Plant = new Plant();
    sites: Site[];
    resize: number;
    plantAnalysis: PlantAnalysis;
    samplings: any;

    soilChar: any[];

    showSites: boolean;
    showSensors: boolean;
    showPlants: boolean;
    showSamplings: boolean;

    showTemp: boolean;
    showPress: boolean;
    showHumid: boolean;
    clearOverlay: boolean;

    constructor(
        private activeRoute: ActivatedRoute,
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ) {

        this.plantAnalysis = new PlantAnalysis();

        this.showPlants = true;
        this.showSamplings = false;
        this.showSensors = true;
        this.showSites = true;

        this.showTemp = false;
        this.showPress = false;
        this.showHumid = false;
        this.clearOverlay = true;

        this.soilChar = undefined;

        this.resize = 0;

        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn) {
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('Total Analysis');
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
                        },
                        err => {
                            console.error(err);
                        }
                    );

                    this.apiService.getSites(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.sites = data.data;
                        }
                    );

                    this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.sensors = data.data;
                        }
                    );

                    this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.plants = data.data;
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
                    if (this.farms.length === 0){
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
                        }
                    );

                    this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.sensors = data.data;
                        }
                    );

                    this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.plants = data.data;
                        }
                    );
                }
            );
        }
    }

    public selectFarm(id: number) {
        this.soilChar = undefined;
        this.showPlants = true;
        this.showSamplings = false;
        this.showSensors = true;
        this.showSites = true;
        this.showTemp = false;
        this.showPress = false;
        this.showHumid = false;
        this.clearOverlay = true;
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
                    }
                );

                this.apiService.getSites(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                .subscribe(
                    response => {
                        data = response;
                        data = JSON.parse(data._body);
                        this.sites = data.data;
                    }
                );

                this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                .subscribe(
                    response => {
                        data = response;
                        data = JSON.parse(data._body);
                        this.sensors = data.data;
                    }
                );

                this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                .subscribe(
                    response => {
                        data = response;
                        data = JSON.parse(data._body);
                        this.plants = data.data;
                    }
                );
            }
        );
    }

    public selectSensor(sensorID: string) {
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

        const selected: any = $.grep(this.sensors, function(e){ return e.sensor_name === sensorID; });
        // console.log(selected[0]);
        $('#searchPlant').val(selected[0].plant_name);
        this.zoomTo = [selected[0].lat, selected[0].lng];
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
                // console.log("sensor count: "+this.sensors.length);
                // console.log(this.sensors);
            }
        );
    }

    public onMapResize() {
        this.resize++;
        // console.log('map resize');
    }

    public toggleOverlay(type: string) {
        switch (type) {
            case 'none':
                this.showTemp = false;
                this.showPress = false;
                this.showHumid = false;
                this.clearOverlay = true;
                $('.legend').hide(); break;
            case 'temp':
                this.showTemp = true;
                this.showPress = false;
                this.showHumid = false;
                this.clearOverlay = false;
                $('.legend').hide();
                $('#tempLegend').show(); break;
            case 'press':
                this.showPress = true;
                this.showTemp = false;
                this.showTemp = false;
                $('.legend').hide();
                $('#pressLegend').show(); break;
            case 'humid':
                this.showHumid = true;
                this.showTemp = false;
                this.showPress = false;
                $('.legend').hide();
                $('#humidLegend').show(); break;
        }
    }

    public toggleSites() {
        this.showSites = !this.showSites;
        if (this.showSamplings && this.showSites) {
            this.showSamplings = !this.showSamplings;
        }
    }

    public togglePlants() {
        this.showPlants = !this.showPlants;
    }

    public toggleSensors() {
        this.showSensors = !this.showSensors;
    }

    public toggleSamplings() {
        this.showSamplings = !this.showSamplings;
        if (this.showSamplings && this.showSites) {
            this.showSites = !this.showSites;
        }
    }

    public togglePlantAnalysis() {
        let data: any;
        if (this.selectedPlant) {
            this.apiService.getPlantAnalysis(this.sessionService.getLoggedInKey(), this.selectedPlant.plant_id)
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    data = data.data;
                    this.plantAnalysis = data;
                    // console.log(this.plantAnalysis);
                    $('#plantAnalysisModal').modal('toggle');
                }
            );
        }

    }

    public getBgColor(result: string){
        if (result === 'clean'){
            return '#33c57d';
        } else if (result === 'infected') {
            return '#FF8657';
        } else {
            return '#888888';
        }
    }

    public selectPlant(plantID: string){
        // console.log('Plant '+ plantID + ' selected!');
        let data: any;
        this.apiService.getPlant(this.sessionService.getLoggedInKey(), plantID)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                // console.log(data.data);
                this.selectedPlant = data.data;
                this.togglePlantAnalysis();
                // console.log(this.selectedPlant);
            }
        );
        const selected: any = $.grep(this.plants, function(e){ return (e.plant_id === plantID); });
        // console.log(selected[0]);
        $('#searchPlant').val(selected[0].plant_name);
        this.zoomTo = [selected[0].lat, selected[0].lng];
    }

}
