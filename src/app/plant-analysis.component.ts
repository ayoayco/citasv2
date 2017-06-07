import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';

@Component({
    selector: 'app-plant-analysis',
    templateUrl: './plant-analysis.component.html',
    styleUrls: ['./plant-analysis.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class AppPlantAnalysisComponent{
    
    farms: Farm[] = [];
    selectedFarm: Farm = new Farm();
    plants: any[] = [];
    selectedPlant: any = undefined;
    sites: any[];

    constructor(
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ){
        let loggedIn: boolean = this.sessionService.isLoggedIn();
        if(!loggedIn){
            this.router.navigate(['/']);
        }else{
            this.titleService.setTitle('Plant Analysis');
        }

        let data : any;

        this.apiService.getFarmList(this.sessionService.getLoggedInKey())
        .then(
            res => {
                data = res;
                if(data.data){
                    this.farms = data.data;
                    console.log(this.farms);
                    this.selectedFarm.farm_name = data.data[0].farm_name;
                    this.selectedFarm.farm_id = data.data[0].farm_id;

                    this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .then(
                        res => {
                            data = res;
                            this.selectedFarm = data.data[0];
                            console.log("select farm: " + this.selectedFarm.farm_name);
                            console.log("select farm ID: " + this.selectedFarm.farm_id);

                            this.apiService.getSites(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                            .then(
                                response => {
                                    data = response;
                                    this.sites = data.data;
                                    console.log('sites!');
                                    console.log(this.sites);
                                }
                            );

                            this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                            .then(
                                res => {
                                    data = res;
                                    this.plants = data.data;
                                    console.log("plant count: "+this.plants.length);
                                    console.log(this.plants);
                                }
                            );

                        }
                    );

                }
                //console.log(this.farms);
            }
        );
    }

    public selectFarm(name: string){
        
        this.plants = [];
        this.selectedPlant = undefined;
        this.selectedFarm.farm_name = name;
        let selectedArr = $.grep(this.farms, function(e){ return e.farm_name == name });
        this.selectedFarm = selectedArr[0];

        let data: any;

        this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
        .then(
            res => {
                data = res;
                this.selectedFarm = data.data[0];
                console.log("select farm: " + this.selectedFarm.farm_name);
                console.log("select farm ID: " + this.selectedFarm.farm_id);


                this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                .then(
                    res => {
                        data = res;
                        this.plants = data.data;
                        console.log("plant count: "+this.plants.length);
                        console.log(this.plants);
                    }
                );

            }
        );
    }

    public selectPlant(plantID: number){
        console.log('Plant '+ plantID + ' selected!');
        let data: any;
        this.apiService.getPlant(this.sessionService.getLoggedInKey(), plantID.toString())
        .then(
            res => {
                data = res;
                this.selectedPlant = data.data;
                console.log(this.selectedPlant);
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
        console.log('selected site: ' + siteID)
        this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString(), siteID.toString())
        .then(
            res => {
                data = res;
                this.plants = data.data;
                console.log("plant count: "+this.plants.length);
                console.log(this.plants);
            }
        );
    }

}