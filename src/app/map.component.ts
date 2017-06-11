import { Component, Input, Output, OnChanges, AfterViewInit, EventEmitter } from '@angular/core';
import { Farm } from './models/farm';
import { AppSessionService } from './app.session.service';
import { CitasApiService} from './citas.api.service';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class MapComponent implements OnChanges{

    @Input() selectedFarm: Farm;
    @Input() sensors: any[];
    @Input() plants: any[];
    
    @Output() selectPlant = new EventEmitter<{}>();

    mymap: L.Map;

    constructor(
        private apiService: CitasApiService,
        private sessionService: AppSessionService
    ){
    }

    ngAfterViewInit(){

        // initialize map
        this.mymap = new L.Map("map-div", {
            center: new L.LatLng(12.4, 122.4),
            zoom: 5.5,
        });

        // base map
        let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(this.mymap);

    }


    ngOnChanges(changes){

        let farmLayer = L.layerGroup([]);
        let sitesLayer = L.layerGroup([]);
        let plantsLayer = L.layerGroup([]);
        let sensorsLayer = L.layerGroup([]);

        // selectedFarm changed
        if(changes.selectedFarm && changes.selectedFarm.firstChange == false ){
            console.log("Map Farm: " + this.selectedFarm.farm_name);
            let data: any;

            //get farm details
            this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
            .then(
                res => {
                    data = res.data[0];
                    if(data){
                        // to do: clear previous layer
                        farmLayer.clearLayers();
                        let center = new L.LatLng(data.center[0], data.center[1]);
                        let zoom = 0;
                        switch(data.farm_size){
                            case "large": zoom = 14 ; break;
                            case "small": zoom = 15 ; break;
                            default: zoom = 14; break;
                        }
                        this.mymap.setView(center, zoom);
                        let polygon = L.polygon(data.geometry);
                        farmLayer.addLayer(polygon);
                        farmLayer.addTo(this.mymap);
                    }
                }
            );

            // get sites in farm
            this.apiService.getSites(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
            .then(
                res => {
                    data = res.data;
                    if(data){
                        // to do: clear previous layer
                        sitesLayer.clearLayers();
                        for(let i=0; i<data.length; i++){
                            let polygon = L.polygon(data[i].geometry);
                            sitesLayer.addLayer(polygon);
                            sitesLayer.addTo(this.mymap);
                        }
                    }
                }
            );
        }  

        // plants changed
        if(changes.plants && changes.plants.firstChange == false ){
            console.log("Map Plants: " + this.plants.length);

            //to do: clear layers
            plantsLayer.clearLayers();
            var plantIcon = L.icon({
                iconUrl: './assets/images/plant.healthy.png',

                iconSize:     [25, 25] // size of the icon
                // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            
                console.log(this.plants);

            for(var i=0; i<this.plants.length; i++){
                let arg = this.plants[i];
                let latlng = new L.LatLng(arg.lat, arg.lng);
                let marker = L.marker(latlng, {icon: plantIcon}).on('click', ()=>{
                    this.onSelect('plant', arg);
                });

                plantsLayer.addLayer(marker);
                plantsLayer.addTo(this.mymap);
            }
        }

        // sensors changed
        if(changes.sensors && changes.sensors.firstChange == false ){
            console.log("Map Sensors: " + this.sensors.length);

            //to do: clear layers
            sensorsLayer.clearLayers();
            var sensorIcon = L.icon({
                iconUrl: './assets/images/sensor.png',

                iconSize:     [25, 25] // size of the icon
                // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            
            for(var i=0; i<this.sensors.length; i++){
                let latlng = new L.LatLng(this.sensors[i].lat, this.sensors[i].lng);
                sensorsLayer.addLayer(L.marker(latlng, {icon: sensorIcon}));
                sensorsLayer.addTo(this.mymap);
            }
        }
    }

    private onSelect(type:string, plant){
        console.log(type + " selected");
        this.selectPlant.emit(plant.plant_id);
    }
}