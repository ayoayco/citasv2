import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';
import { User } from './models/user';

@Component({
    selector: 'register-farm',
    templateUrl: './register-farm.component.html',
    styleUrls: ['./register-farm.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class RegisterFarmComponent{

    farms: Farm[];
    selectedFarm: Farm = new Farm();
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
                }
                ////console.log(this.farms);
            }
        );
    }

    public selectFarm(id: number){
        let selectedArr = $.grep(this.farms, function(e){ return e.farm_id == id });
        this.selectedFarm = selectedArr[0];

        let data: any;

        this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
        .then(
            res => {
                data = res.data[0];
                this.selectedFarm = data;
                //console.log(this.selectedFarm);
            }
        );
    }

}