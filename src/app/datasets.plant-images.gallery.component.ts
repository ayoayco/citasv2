import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Plant } from './models/plant';

@Component({
    selector: 'plant-images-gallery',
    templateUrl: './datasets.plant-images.gallery.component.html',
    styleUrls: ['./datasets.plant-images.gallery.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class DatasetsPlantImagesGalleryComponent implements OnChanges {
    @Input() selectedPlant: Plant = new Plant();
    imageResult: string;
    sensorResult: string;
    plantImages: any;
    viewType: string;

    constructor(
        private apiService: CitasApiService,
        private sessionService: AppSessionService
    ){
        console.log(this.selectedPlant);
        this.viewType = "grid";
    }

    ngOnChanges(changes: SimpleChanges) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add 'implements OnChanges' to the class.
        if(changes.selectedPlant && changes.selectedPlant.firstChange == false){
            let data: any;
            this.apiService.getPlantImages(this.sessionService.getLoggedInKey(), this.selectedPlant.plant_id)
            .then(
                res => {
                    data = res.images;
                    this.plantImages = data;
                    console.log(this.plantImages);
                }
            )
        }
    }

    public getLabel(type:string){
            
        var label ="";
        switch(type){
            case "Generic Plant Image": label="Plant"; break;
            case "Leaf Pre-Analysis Image": label="Actual"; break;
            case "PlantScope Pre-Analysis Image":  label="Actual"; break;
            case "LampAssay Processed Image":  label="Actual"; break;
            case "Leaf Analysis Image":  label="Processed"; break;
            case "PlantScope Analysis Image":  label="Processed"; break;
            case "LampAssay Analysis Image":  label="Processed"; break;
            default: label = "Unknown"; break;
        }

        return label;
    }

    public getTypeStyle(type: string){
        var color ="";
        switch(type){
            case "Generic Plant Image": color="#19bd6c"; break;
            case "Leaf Pre-Analysis Image": color="#0f9eda"; break;
            case "PlantScope Pre-Analysis Image":  color="#33c57d"; break;
            case "LampAssay Processed Image":  color="#ff5757"; break;
            case "Leaf Analysis Image":  color="#57675f"; break;
            case "PlantScope Analysis Image":  color="#ff8657"; break;
            case "LampAssay Analysis Image":  color="#2d3841"; break;
            default: color = "#888888"; break;
        }

        return color;
    }

    public viewAs(type: string){
        this.viewType = type;
    }
}