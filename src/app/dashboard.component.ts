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
    
    farms: Farm[] = [];
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

        let farm_id = undefined;
        this.activeRoute.params.forEach(
            (params : Params) => {
                farm_id = params["id"];
            }
        );

        if(farm_id != undefined){
            this.apiService.getFarm(this.sessionService.getLoggedInKey(), farm_id.toString())
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    data = data.data[0];
                    this.selectedFarm = data;

                    this.apiService.getUser(this.sessionService.getLoggedInKey())
                    .subscribe(
                        res => {
                            data = res;
                            data = JSON.parse(data._body);
                            this.user = data;
                            if(data.organization)
                                this.user.details.organization = data.organization;
                        }
                    )

                    this.apiService.getSensorList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .subscribe(
                        res => {
                            data = res;
                            data = JSON.parse(data._body);
                            this.sensors = data.data;
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

                    this.apiService.getFarmList(this.sessionService.getLoggedInKey())
                    .subscribe(
                        res => {
                            data = res;
                            data = JSON.parse(data._body);
                            
                            console.log(data);

                            if(data.data){
                                this.farms = data.data;
                            }
                        }
                    );

                }
            );
        }else{
            this.apiService.getFarmList(this.sessionService.getLoggedInKey())
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);

                    console.log(data);

                    if(data.data){
                        this.farms = data.data;
                    }

                    this.apiService.getUser(this.sessionService.getLoggedInKey())
                    .subscribe(
                        res => {
                            data = res;
                            data = JSON.parse(data._body);
                            this.user = data;
                        }
                    )
                    if(this.farms.length > 0){
                        this.selectedFarm = this.farms[0];
                        this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
                        .subscribe(
                            res => {
                                data = res;
                                data = JSON.parse(data._body);
                                data = data.data[0];
                                this.selectedFarm = data;
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

                        this.apiService.getPlantList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                        .subscribe(
                            res => {
                                data = res;
                                data = JSON.parse(data._body);
                                this.plants = data.data;
                            }
                        );
                    }
                }
            );
            
        }
    }

    public selectFarm(id: number){
        this.plants = [];
        this.sensors = []

        let data: any;
        this.apiService.getFarm(this.sessionService.getLoggedInKey(), id.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                data = data.data[0];
                this.selectedFarm = data;

                this.apiService.getSensorList(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                .subscribe(
                    res => {
                        data = res;
                        data = JSON.parse(data._body);
                        this.sensors = data.data;
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
        );
    }

}