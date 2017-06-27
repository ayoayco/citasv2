import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Plant } from './models/plant';
import { PlantAnalysis } from './models/plant-analysis';

declare let jssor_1_slider_init: any;

@Component({
    selector: 'plant-info',
    templateUrl: './plant-analysis.plant-info.component.html',
    styleUrls: ['./plant-analysis.plant-info.component.css']
})

export class PlantAnalysisPlantInfoComponent implements OnChanges {
    @Input() selectedPlant: Plant = new Plant();
    @Input() plantAnalysis: PlantAnalysis = new PlantAnalysis();

    constructor(){
        console.log(this.selectedPlant);
    }

public getLabel(result: string){
    if(result == "not_infected"){
        return "Uninfected";
    }
    else if(result == "infected"){
        return "Infected";
    }
    else{
        return "Unknown";
    }
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

        }
    }
}