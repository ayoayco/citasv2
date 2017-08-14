import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';
import { Site } from './models/site';

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
    
    farms: Farm[] = undefined;
    selectedFarm: Farm = new Farm();
    plants: any[] = [];
    sensors: any[] = [];
    sites: Site[];
    user_type: number;

    constructor(
        private activeRoute: ActivatedRoute,
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ){
        this.user_type = this.sessionService.getLoggedInUserType();
        let loggedIn: boolean = this.sessionService.isLoggedIn();
        if(!loggedIn){
            this.router.navigate(['/']);
        }else{
            this.titleService.setTitle('Dashboard');
        }

        let data : any;

        let farm_id = this.sessionService.retriveData('farm_id');

        if(farm_id != null){
            this.apiService.getFarm(this.sessionService.getLoggedInKey(), farm_id)
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    data = data.data[0];
                    this.selectedFarm = data;

                    this.apiService.getSites(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .subscribe(
                        response => {
                            data = response;
                            data = JSON.parse(data._body);
                            this.sites = data.data;
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

                    this.apiService.getFarmList(this.sessionService.getLoggedInKey())
                    .subscribe(
                        res => {
                            data = res;
                            data = JSON.parse(data._body);

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

                    if(data.data){
                        this.farms = data.data;
                        if(this.farms.length == 0){
                            // no farms yet, navigate to add new farm
                            this.router.navigate(['/register-farm']);
                        }
                    }
                    
                    if(this.farms.length > 0){
                        this.selectedFarm = this.farms[0];
                        this.sessionService.saveData('farm_id', this.selectedFarm.farm_id.toString());

                        this.apiService.getSites(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                        .subscribe(
                            response => {
                                data = response;
                                data = JSON.parse(data._body);
                                this.sites = data.data;
                            }
                        );

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

        this.sessionService.saveData('farm_id', id.toString());

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