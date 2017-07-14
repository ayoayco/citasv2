import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Plant } from './models/plant';

declare let jssor_1_slider_init: any;

@Component({
    selector: 'plant-info',
    templateUrl: './plant-analysis.plant-info.component.html',
    styleUrls: ['./plant-analysis.plant-info.component.css']
})

export class PlantAnalysisPlantInfoComponent implements OnChanges {
    @Input() selectedPlant: Plant = new Plant();

    no_infected: boolean = false;

    constructor(){
        //console.log(this.selectedPlant);
    }

    public getBgColor(result: string){
        if(result == "not_infected"){
            return "#33c57d";
        }
        else if(result == "infected"){
            return "#FF8657";
        }
        else{
            return "#888888";
        }
    }

    ngOnChanges(changes: SimpleChanges){
        if(changes.selectedPlant && changes.selectedPlant.firstChange == false){
            
                this.no_infected = false;
            if( this.selectedPlant != undefined &&
                !this.selectedPlant.leaves_infected &&
                !this.selectedPlant.rhizome_infected &&
                !this.selectedPlant.rhizosphere_infected &&
                !this.selectedPlant.roots_infected &&
                !this.selectedPlant.stem_infected ){
                this.no_infected = true;
            }
            //console.log('plant changed!');

        }
    }
}