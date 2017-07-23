import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';
import { User } from './models/user';

@Component({
    selector: 'view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.css'],
    providers:[
        CitasApiService,
        AppSessionService
    ]
})

export class ViewProfileComponent{
    user: User = new User();
    farms: Farm[] = [];
    selectedFarm: Farm = new Farm();
    role: string;
    imgFile: string;
    constructor(
        private activeRoute: ActivatedRoute,
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ){

        this.role = "";
        this.imgFile = "";
        let loggedIn: boolean = this.sessionService.isLoggedIn();
        if(!loggedIn){
            this.router.navigate(['/']);
        }else{
            this.titleService.setTitle('View Profile');
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
                            this.user.user_type = data.role;
                            switch(this.user.user_type){
                                case 4:
                                    this.role = "Farm Manager";
                                    this.imgFile = "avatar-farmer.png";
                                    break;
                                case 5:
                                    this.role = "Researcher";
                                    this.imgFile = "avatar-researcher.png";
                                    break;
                            }
                            //console.log(this.user);
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
                    this.farms = data.data;

                    this.apiService.getUser(this.sessionService.getLoggedInKey())
                    .subscribe(
                        res => {
                            data = res;
                            data = JSON.parse(data._body);
                            this.user = data;
                            this.user.user_type = data.role;
                        }
                    )

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
                }
            );
            
        }
    }

    updateUser(){
        
        let data: any;

        this.apiService.getUser(this.sessionService.getLoggedInKey())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.user = data;
                console.log(res);
                this.user.user_type = data.role;
                switch(this.user.user_type){
                    case 4:
                        this.role = "Farm Manager";
                        this.imgFile = "avatar-farmer-min.png";
                        break;
                    case 5:
                        this.role = "Researcher";
                        this.imgFile = "avatar-researcher-min.png";
                        break;
                }
                //console.log(this.user);
            }
        );
    }
}