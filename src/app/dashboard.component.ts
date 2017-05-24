import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service'

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
    selectedFarm: string;

    constructor(
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ){
        let loggedIn: boolean = this.sessionService.isLoggedIn();
        if(!loggedIn){
            console.log("Please log in first.")
            this.router.navigate(['/']);
        }else{
            this.titleService.setTitle('Dashboard');
        }

        let data : any;

        this.apiService.getFarms(this.sessionService.getLoggedInKey())
        .then(
            res => {
                data = res;
                if(data.data){
                    this.farms = data.data;
                    this.selectedFarm = data.data[0].farm_name;
                }
                console.log(this.farms);
            }
        );
    }

    public selectFarm(name: string){
        this.selectedFarm = name;
        console.log("select farm: " + this.selectedFarm);
    }

}