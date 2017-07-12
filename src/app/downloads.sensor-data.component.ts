import { Component, Input } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';

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

    selectedSiteID: string= 'all';
    
    constructor(
        private sessionService: AppSessionService,
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
            this.selectedSiteID,
            this.from,
            this.to
        ).then(
            res => {
                data = res;
                //console.log(data);
                window.open(data.dl_link, '_blank');
            }
        );
    }

}