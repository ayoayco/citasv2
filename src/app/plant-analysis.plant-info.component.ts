import { Component, Input } from '@angular/core';

@Component({
    selector: 'plant-info',
    templateUrl: './plant-analysis.plant-info.component.html',
    styleUrls: ['./plant-analysis.plant-info.component.css']
})

export class PlantAnalysisPlantInfoComponent {
    @Input() selectedPlant: any = undefined;

    constructor(){
        console.log("selectedPlant");
        console.log(this.selectedPlant);
    }
}

/*

{
    growth_stage: "mature"
    images: Array(0)
    leaf_area: 0
    leaf_count: 0
    leaves_infected: false
    plant_description: "Attached"
    plant_height: 0
    plant_id: 2
    plant_name: "Palnt1"
    plant_variety: "Banana"
    pseudostem_infected: false
    qrcode: "0"
    rhizom_infected: false
    rhizosphere_infected: false
    roots_infected: false
    sampling_site_id: 2
    stem_infected: false
}

*/