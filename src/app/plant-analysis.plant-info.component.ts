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
    imageResult: string;
    sensorResult: string;

    constructor(){
        console.log(this.selectedPlant);
    }

public getBgColor(result: string){
    if(result == "Uninfected"){
        return "#33c57d";
    }
    else if(result == "Infected"){
        return "#FF8657";
    }
    else{
        return "#888888";
    }
}

    ngOnChanges(changes: SimpleChanges){
        if(changes.selectedPlant && changes.selectedPlant.firstChange == false){

            console.log('plant changed!');

            if(this.selectedPlant.analysis_result.image == "not_infected"){
                this.imageResult = "Uninfected";
            }
            else if(this.selectedPlant.analysis_result.image == "infected"){
                this.imageResult = "Infected";
            }
            else{
                this.imageResult = "Unknown";
            }

            if(this.selectedPlant.analysis_result.sensor == "not_infected"){
                this.sensorResult = "Uninfected";
            }
            else if(this.selectedPlant.analysis_result.sensor == "infected"){
                this.sensorResult = "Infected";
            }
            else {
                this.sensorResult = "Unknown";
            }
        }
    }
}