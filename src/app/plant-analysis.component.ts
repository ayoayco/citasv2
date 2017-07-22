import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';
import { Plant } from './models/plant';

@Component({
    selector: 'app-plant-analysis',
    templateUrl: './plant-analysis.component.html',
    styleUrls: ['./plant-analysis.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class AppPlantAnalysisComponent {
    
    farms: Farm[] = [];
    selectedFarm: Farm = new Farm();
    plants: Plant[] = [];
    selectedPlant: Plant = new Plant();
    sites: any[];

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
            this.titleService.setTitle('Plant Analysis');
        }

        let data : any;

        this.plants = [];
        this.selectedPlant = undefined;
        
        let farm_id = undefined;
        this.activeRoute.params.forEach(
            (params : Params) => {
                farm_id = params["id"];
            }
        );

        this.apiService.getFarmList(this.sessionService.getLoggedInKey())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                if(data.data){
                    this.farms = data.data;

                    if(farm_id == undefined){
                        this.selectedFarm = this.farms[0];
                    }else{
                        let selectedArr = $.grep(this.farms, function(e){ return e.farm_id == farm_id });
                        this.selectedFarm = selectedArr[0];
                    }


                    //console.log('selected farm: ' + this.selectedFarm.farm_name);
                    this.apiService.getSites(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.sites = data.data;
                            //console.log('sites');
                            //console.log(this.sites);
                        }
                    );

                    this.apiService.getPlantList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .subscribe(
                        res => {
                            data = res;
                            data = JSON.parse(data._body);
                            this.plants = data.data;
                        }
                    );

                }
                ////console.log(this.farms);
            }
        );
    }

    public selectFarm(id: number){
        
        this.plants = [];
        this.selectedPlant = undefined;
        let selectedArr = $.grep(this.farms, function(e){ return e.farm_id == id });
        this.selectedFarm = selectedArr[0];

        let data: any;

        //console.log('selected farm: ' + this.selectedFarm.farm_name);
        this.apiService.getSites(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
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
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                this.plants = data.data;
            }
        );

    }

    public selectPlant(plantID: string){
        //console.log('Plant '+ plantID + ' selected!');
        let data: any;
        this.apiService.getPlant(this.sessionService.getLoggedInKey(), plantID)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                //console.log(data);
                this.selectedPlant = data.data;
                ////console.log(this.selectedPlant);
            }
        )
    }

}