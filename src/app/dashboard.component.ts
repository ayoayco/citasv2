import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';

@Component ({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class AppDashboardComponent {
    
    farms: Farm[];
    selectedFarm: Farm = new Farm();
    plants: any[] = [];
    sensors: any[] = [];

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
            this.titleService.setTitle('Dashboard');
        }

        let data : any;

        let farm_name = undefined;
        this.activeRoute.params.forEach(
            (params : Params) => {
                farm_name = params["id"];
            }
        );

        this.apiService.getFarmList(this.sessionService.getLoggedInKey())
        .then(
            res => {
                data = res;
                

                if(data.data){

                    this.farms = data.data;

                    if(farm_name == "" || farm_name == undefined){
                        this.selectedFarm = this.farms[0];
                        console.log('selected farm: ' + this.selectedFarm.farm_name);
                    }else{
                        let selectedArr = $.grep(this.farms, function(e){ return e.farm_name == farm_name });
                        this.selectedFarm = selectedArr[0];
                        console.log('selected farm: ' + this.selectedFarm.farm_name);
                    }

                    this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .then(
                        res => {
                            data = res;

                            this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                            .then(
                                res => {
                                    data = res;
                                    this.plants = data.data;
                                    console.log("plant count: "+this.plants.length);
                                    console.log(this.plants);
                                }
                            );

                            this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                            .then(
                                res => {
                                    data = res;
                                    this.sensors = data.data;
                                    console.log("sensors count: "+this.sensors.length);
                                    console.log(this.sensors);
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
        let selectedArr = $.grep(this.farms, function(e){ return e.farm_name == name });
        this.selectedFarm = selectedArr[0];
        this.plants = [];
        this.sensors = []

        let data: any;

        this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
        .then(
            res => {
                data = res;
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

               this.apiService.getSensorList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
               .then(
                   res => {
                       data = res;
                       this.sensors = data.data;
                       console.log("sensors count: "+this.sensors.length);
                       console.log(this.sensors);
                   }
               );

            }
        );
    }

}