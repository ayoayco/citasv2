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

    @Input() selectedFarm: Farm;
    @Input() sites: Site[];

    selectedSiteID: number;
    
    constructor(
        private activeRoute: ActivatedRoute,
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ){
    }

    public downloadSensorData(){
        let data: any;
        // console.log(this.from);
        // console.log(this.to);
        // console.log(this.selectedSiteID);
        this.apiService.getSensorsFilterDownloadLink(
            this.sessionService.getLoggedInKey(),
            this.selectedFarm.farm_id.toString(),
            this.selectedSiteID.toString(),
            this.from,
            this.to
        ).then(
            res => {
                data = res;
                console.log(data);
                //window.open(data.dl_link, '_blank');
            }
        );
    }

}