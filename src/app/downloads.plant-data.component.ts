import { Component, Input } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';

import { Farm } from './models/farm';
import { Site } from './models/site';

@Component({
    selector: 'download-plant-data',
    templateUrl: './downloads.plant-data.component.html',
    styleUrls: ['./downloads.plant-data.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class DownloadPlantDataComponent{
    from: Date;
    to: Date;
    health: string = 'all';
    error: string = "";

    @Input() selectedFarm: Farm;
    @Input() sites: Site[];

    selectedSiteID: string = 'all';
    
    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService
    ){
    }

    public downloadPlantData(){
        let data: any;
        this.apiService.getPlantsFilterDownloadLink(
            this.sessionService.getLoggedInKey(),
            this.selectedFarm.farm_id.toString(),
            this.selectedSiteID,
            this.health,
            this.from,
            this.to
        ).subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                // console.log(data);
                if(data.Success){
                    window.open(data.dl_link, '_blank');
                }else{
                    this.error = data.err;
                    //console.log(this.error);
                }
            }
        );
    }
}