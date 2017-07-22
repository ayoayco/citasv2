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
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
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
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);

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
                    .subscribe(
                        res => {
                            data = res;
                            data = JSON.parse(data._body);
                            data = data.data;
                            this.selectedFarm = data[0];
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

                    this.apiService.getSensorList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .subscribe(
                        res => {
                            data = res;
                            data = JSON.parse(data._body);
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
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                data = data.data;
                this.selectedFarm = data[0];
                //console.log(this.selectedFarm);
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

        this.apiService.getSensorList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.sensors = data.data;
            }
        );
    }

}