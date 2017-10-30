import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';
import { Plant } from './models/plant';

@Component({
    selector: 'plant-images',
    templateUrl: './datasets.plant-images.component.html',
    styleUrls: ['./datasets.plant-images.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class DatasetsPlantImagesComponent {
    farms: Farm[] = [];
    selectedFarm: Farm = new Farm();
    plants: Plant[] = [];
    selectedPlant: Plant = new Plant();
    sites: any;

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
            this.titleService.setTitle('Collected Plant Images');
        }

        let data: any;
        this.plants = [];
        this.selectedPlant = undefined;
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

                    this.apiService.getPlantList(
                        this.sessionService.getLoggedInKey(),
                        this.selectedFarm.farm_id.toString())
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

                    this.apiService.getPlantList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response  => {
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
        let data: any;
        this.plants = [];
        this.selectedPlant = undefined;
        this.sessionService.saveData('farm_id', this.selectedFarm.farm_id.toString());
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
                        //console.log(this.sites);
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

    public selectPlant(plantID: string){
        // console.log('Plant '+ plantID + ' selected!');
        let data: any;
        this.apiService.getPlant(this.sessionService.getLoggedInKey(), plantID)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.selectedPlant = data.data.plant;
                // console.log(this.selectedPlant);
            }
        )
    }

    public onselect(val){
        this.plants = [];
        this.selectedPlant = undefined;
        this.selectSite(val);
    }

    public selectSite(siteID: number){
        let data: any;
        // console.log('selected site: ' + siteID)
        this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString(), siteID.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.plants = data.data;
            }
        );
    }

}
