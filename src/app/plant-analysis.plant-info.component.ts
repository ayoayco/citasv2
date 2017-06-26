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

    ngOnChanges(changes: SimpleChanges){
        if(changes.selectedPlant && changes.selectedPlant.firstChange == false){
            if(this.selectedPlant.analysis_result.image == "not_infected"){
                this.imageResult = "Uninfected";
                console.log($('.result-span:first-child'));
                $('#image.result-span').css('color', '#33c57d');
            }
            else if(this.selectedPlant.analysis_result.image == "infected"){
                this.imageResult = "Infected";
                $('#image.result-span').css('color', '#FF8657');
            }
            else{
                this.imageResult = "Unknown";
                $('#image.result-span').css('color', '#888');
            }

            if(this.selectedPlant.analysis_result.sensor == "not_infected"){
                this.sensorResult = "Uninfected";
                $('#sensor.result-span').css('color', '#33c57d');
            }
            else if(this.selectedPlant.analysis_result.sensor == "infected"){
                this.sensorResult = "Infected";
                $('#sensor.result-span').css('color', '#FF8657');
            }
            else {
                this.sensorResult = "Unknown";
                $('#sensor.result-span').css('color', '#888');
            }
        }
    }
}