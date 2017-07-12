import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
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

export class PlantListComponent implements AfterViewInit{
    @Input() selectedFarm: Farm = new Farm();
    @Input() plants: Plant[] = [];
    @Input() selectedPlant: Plant = new Plant();
    @Input() sites: Site[];
    zoomTo: number[] = undefined;
    
    @Output() selectPlant = new EventEmitter<{}>();
    @Output() setZoom = new EventEmitter<{}>();

    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService
        ){
    }

    ngAfterViewInit(){
        var hideList = ($('#searchPlant').val() == "" || $('#searchPlant').val() == undefined);
        if(hideList){
            $('#searchList').hide();
            $('#xButton').hide();
        }
    }

    public onSelectPlant(id: string){
        //console.log("Select plant: " + id);
        this.selectPlant.emit(id);
        let selected: any = $.grep(this.plants, function(e){ return e.plant_id == id });
        //console.log(selected[0]);
        $('#searchPlant').val(selected[0].plant_name);
        this.zoomTo = [selected[0].lat, selected[0].lng];
        //console.log(this.zoomTo);
        this.hideListNow();
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

    public hideListNow(){
        $('#searchList').hide();
    }

    public searchPlants(str: string){
        
        var hideList = ($('#searchPlant').val() == "" || $('#searchPlant').val() == undefined);
        if(hideList){
            $('#searchList').hide();
            $('#xButton').hide();
        }else{
            $('#searchList').show();
            $('#xButton').show();
        }


        // Declare variables
        var input, filter, ul, li, a, i;
        input = $('#searchPlant');
        filter = input.val().toUpperCase();
        ul = $('#searchList');
        li = ul.find('li');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }

    }

    public clearSearchPlant(){
        $('#searchPlant').val("");
        $('#xButton').hide();
        $('#searchList').hide();
    }
}