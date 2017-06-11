import { Component, Input } from '@angular/core';
import { Plant } from './models/plant';

declare let jssor_1_slider_init: any;

@Component({
    selector: 'plant-info',
    templateUrl: './plant-analysis.plant-info.component.html',
    styleUrls: ['./plant-analysis.plant-info.component.css']
})

export class PlantAnalysisPlantInfoComponent {
    @Input() selectedPlant: Plant = new Plant();

    constructor(){
        console.log(this.selectedPlant);
    }
}