import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { CitasApiService } from './citas.api.service';

import { Farm } from './models/farm';
import { Plant } from './models/plant';
import { Site } from './models/site';

@Component({
    selector: 'plant-list',
    templateUrl: './plant-list.component.html',
    styleUrls: ['./plant-list.component.css']
})

export class PlantListComponent{
    @Input() selectedFarm: Farm = new Farm();
    @Input() plants: Plant[] = [];
    @Input() selectedPlant: Plant = new Plant();
    @Input() sites: Site[];
    
    @Output() selectPlant = new EventEmitter<{}>();

    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService
        ){

    }

    public onSelectPlant(id: string){
        this.selectPlant.emit(id);
    }

    public onSelectSite(val){
        this.plants = [];
        this.selectedPlant = undefined;
        let data: any;
        //console.log('selected site: ' + siteID)
        this.apiService.getPlantList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString(), val.toString())
        .then(
            res => {
                data = res;
                this.plants = data.data;
            }
        );
    }

    public downloadPlant(){
        if(this.selectedPlant.plant_id != ""){
            let data: any;
            this.apiService.getPlantImagesDownloadLink(this.sessionService.getLoggedInKey(), this.selectedPlant.plant_id)
            .then(
                res => {
                    data = res;
                    window.open(data.dl_link, '_blank');
                    //console.log(data);
                }
            );
        }
    }
}