import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Plant } from './models/plant';

declare const jssor_1_slider_init: any;

@Component({
    selector: 'plant-info',
    templateUrl: './plant-analysis.plant-info.component.html',
    styleUrls: ['./plant-analysis.plant-info.component.css']
})

export class PlantAnalysisPlantInfoComponent implements OnChanges {
    @Input() selectedPlant: Plant = new Plant();

    no_infected = false;
    selected = 'overview';
    selectedItem: any;
    con = console;

    constructor() {
        this.selectedItem = undefined;
    }

    public getBgColor(result: string){
        if (result === 'not_infected') {
            return '#33c57d';
        } else if (result === 'infected') {
            return '#FF8657';
        } else {
            return '#888888';
        }
    }

    public updatePlantInfo(str: string) {
        this.selectedItem = undefined;
        this.selected = str;
        $('li a.selectedTab').removeClass('selectedTab');
        $('li a#' + str).addClass('selectedTab');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.selectedPlant && changes.selectedPlant.firstChange === false) {
            console.log(this.selectedPlant);
            this.no_infected = false;
            if ( this.selectedPlant !== undefined &&
                !this.selectedPlant.leaves_infected &&
                !this.selectedPlant.rhizome_infected &&
                !this.selectedPlant.rhizosphere_infected &&
                !this.selectedPlant.roots_infected &&
                !this.selectedPlant.stem_infected ) {
                this.no_infected = true;
            }
            // console.log('plant changed!');
        }
        if (changes.selectedItem && changes.selectedItem.firstChange === false) {
            console.log(this.selectedItem);
        }
    }
}
