import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';
import { User } from './models/user';

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
    user: User;

    constructor(
        private activeRoute: ActivatedRoute,
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ){
        this.user = new User();
        let loggedIn: boolean = this.sessionService.isLoggedIn();
        if(!loggedIn){
            this.router.navigate(['/']);
        }else{
            this.titleService.setTitle('Dashboard');
        }

        let data : any;

        this.apiService.getUser(this.sessionService.getLoggedInKey())
        .then(
            res => {
                data = res;
                ////console.log(data);
                if(data){
                    this.user = data;
                    this.user.user_type = data.role;
                }
            }
        );

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
                

                if(data.data){

                    this.farms = data.data;

                    if(farm_id == undefined){
                        this.selectedFarm = this.farms[0];
                        //console.log('selected farm: ' + this.selectedFarm.farm_name);
                    }else{
                        let selectedArr = $.grep(this.farms, function(e){ return e.farm_id == farm_id });
                        this.selectedFarm = selectedArr[0];
                        //console.log('selected farm: ' + this.selectedFarm.farm_name);
                    }

                    this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                    .then(
                        res => {
                            data = res.data[0];
                            this.selectedFarm = data;
                        }
                    );

                    this.apiService.getPlantList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .then(
                        res => {
                            data = res;
                            this.plants = data.data;
                        }
                    );

                    this.apiService.getSensorList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .then(
                        res => {
                            data = res;
                            this.sensors = data.data;
                        }
                    );

                }
                ////console.log(this.farms);
            }
        );
    }

    public selectFarm(id: number){
        let selectedArr = $.grep(this.farms, function(e){ return e.farm_id == id });
        this.selectedFarm = selectedArr[0];
        this.plants = [];
        this.sensors = []

        let data: any;

        this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
        .then(
            res => {
                data = res.data[0];
                this.selectedFarm = data;
                //console.log(this.selectedFarm);
            }
        );

        this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
        .then(
            res => {
                data = res;
                this.plants = data.data;
            }
        );

        this.apiService.getSensorList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
        .then(
            res => {
                data = res;
                this.sensors = data.data;
            }
        );
    }

}