import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Plant } from './models/plant';

@Component({
    selector: 'plant-images-gallery',
    templateUrl: './datasets.plant-images.gallery.component.html',
    styleUrls: ['./datasets.plant-images.gallery.component.css']
})

export class DatasetsPlantImagesGalleryComponent implements OnChanges {
    @Input() selectedPlant: Plant = new Plant();
    imageResult: string;
    sensorResult: string;

    constructor(){
        console.log(this.selectedPlant);
    }

    ngOnChanges(changes: SimpleChanges) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add 'implements OnChanges' to the class.
        
    }
}