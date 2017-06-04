import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './farm';
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
    
    farms: any[];
    selectedFarm: Farm = {
        center: [],
        farm_id: 0,
        farm_name: "",
        farm_size: "",
        foc_present: false,
        foc_prevention: false,
        geocode: "",
        geometry: [],
        soil_management: false,
    };
    plants: any[] = [];

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
            this.titleService.setTitle('Dashboard');
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


                            this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                            .then(
                                res => {
                                    data = res;
                                    this.plants = data.data;
                                    console.log("plant count: "+this.plants.length);
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
                    }
                );

            }
        );
    }

}