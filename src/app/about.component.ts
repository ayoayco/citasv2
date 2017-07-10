import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class AboutComponent {
    
    selectedFarm: Farm = new Farm();

    constructor(
        private activeRoute: ActivatedRoute,
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ){

        $('#select-farm-dropdown').css("border", "0px");

        let loggedIn: boolean = this.sessionService.isLoggedIn();
        if(!loggedIn){
            this.router.navigate(['/']);
        }else{
            this.titleService.setTitle('About PCARI-CITAS');
        }

        let data : any;

        let farm_id = undefined;
        this.activeRoute.params.forEach(
            (params : Params) => {
                farm_id = params["id"];
            }
        );

        this.apiService.getFarm(this.sessionService.getLoggedInKey(), farm_id)
        .then(
            res => {
                data = res.data;
                this.selectedFarm = data[0]
                //console.log(this.selectedFarm);
            }
        )
    }

}