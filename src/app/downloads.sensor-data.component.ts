import { Component, Input } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Farm } from './models/farm';
import { Site } from './models/site';

@Component({
    selector: 'download-sensor-data',
    templateUrl: './downloads.sensor-data.component.html',
    styleUrls: ['./downloads.sensor-data.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class DownloadSensorDataComponent{
    from: Date;
    to: Date;
    sites: Site[];
    farms: Farm[];

    @Input() selectedFarm: Farm;
    
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
            this.titleService.setTitle('Soil Parameter Trends');
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
                this.selectedFarm.farm_name = 'Loading...';
                if(data.data){
                    this.farms = data.data;

                    if(farm_id == undefined){
                        this.selectedFarm = this.farms[0];
                    }else{
                        let selectedArr = $.grep(this.farms, function(e){ return e.farm_id == farm_id });
                        this.selectedFarm = selectedArr[0];
                    }

                    //console.log('selected farm: ' + this.selectedFarm.farm_name);

                    this.apiService.getSites(this.sessionService.getLoggedInKey(),this.selectedFarm.farm_id.toString())
                    .then(
                        response => {
                            data = response;
                            this.sites = data.data;
                            //console.log('sites!');
                            //console.log(this.sites);
                        }
                    );

                }
                ////console.log(this.farms);
            }
        );
    }

    public downloadSensorData(){
        let data: any;
        this.apiService.getSensorsAllDownloadLink(this.sessionService.getLoggedInKey(), this.from, this.to)
        .then(
            res => {
                data = res;
                //console.log(data);
                window.open(data.dl_link, '_blank');
            }
        );
    }

}