import { Component, Input, Output, OnChanges, AfterViewInit, EventEmitter, SimpleChanges } from '@angular/core';
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

    @Input() height: number;
    @Input() disableInteraction: boolean;

    @Input() selectedFarm: Farm;
    @Input() sensors: any[];
    @Input() plants: any[];

    @Input() zoomControl: boolean = true;
    @Input() touchZoom: boolean = true;
    
    @Output() selectPlant = new EventEmitter<{}>();
    @Output() selectSensor = new EventEmitter<{}>();

    mymap: L.Map;
    farmLayer: L.LayerGroup;
    sitesLayer: L.LayerGroup;
    plantsLayer: L.LayerGroup;
    sensorsLayer: L.LayerGroup;

    constructor(
        private apiService: CitasApiService,
        private sessionService: AppSessionService
    ){
        this.farmLayer = L.layerGroup([]);
        this.sitesLayer = L.layerGroup([]);
        this.plantsLayer = L.layerGroup([]);
        this.sensorsLayer = L.layerGroup([]);
    }

    ngAfterViewInit(){

        var dragging = true;
        var doubleClickZoom = true;
        var boxZoom = true;
        var trackResize = true;
        var scrollWheelZoom = true;

        $('div#map-div').css('height', this.height+'px');

        if(this.disableInteraction){
            var dragging = false;
            var doubleClickZoom = false;
            var boxZoom = false;
            var trackResize = false;
            var scrollWheelZoom = false;
        }

        // initialize map
        this.mymap = new L.Map("map-div", {
            zoomControl: this.zoomControl,
            touchZoom: this.touchZoom,
            center: new L.LatLng(12.4, 122.4),
            zoom: 5.5,
            dragging: dragging,
            doubleClickZoom: doubleClickZoom,
            boxZoom: boxZoom,
            trackResize: trackResize,
            scrollWheelZoom: scrollWheelZoom
        });

        L.control.scale().addTo(this.mymap);

        // base map
        let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(this.mymap);

    }


    ngOnChanges(changes: SimpleChanges){

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
                        this.farmLayer.clearLayers();
                        let center = new L.LatLng(data.center[0], data.center[1]);
                        let zoom = 0;
                        switch(data.farm_size){
                            case "large": zoom = 14 ; break;
                            case "small": zoom = 16 ; break;
                            default: zoom = 14; break;
                        }
                        this.mymap.setView(center, zoom);
                        let polygon = L.polygon(data.geometry, {color: 'black', fillOpacity: 0});
                        this.farmLayer.addLayer(polygon);
                        this.farmLayer.addTo(this.mymap);
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
                        this.sitesLayer.clearLayers();
                        for(let i=0; i<data.length; i++){
                            let color = 'white';
                            switch(data[i].status){
                                case "infected": color = 'red'; break;
                                case "not_infected": color = 'green'; break;
                                case "unknown": color = 'white'; break;
                                default: color = 'white';
                            }
                            let polygon = L.polygon(data[i].geometry, {color: color});
                            this.sitesLayer.addLayer(polygon);
                            this.sitesLayer.addTo(this.mymap);
                        }
                    }
                }
            );
        }  

        // plants changed
        if(changes.plants && changes.plants.firstChange == false ){
            console.log("Map Plants: " + this.plants.length);

            //to do: clear layers
            this.plantsLayer.clearLayers();
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
                let marker = L.marker(latlng, {icon: plantIcon});

                if(!this.disableInteraction){
                    marker.on('click', (e)=>{
                        this.onSelect('plant', arg);

                        var layer: any;
                        for(layer in this.plantsLayer["_layers"]){
                            var obj = this.plantsLayer["_layers"][layer];
                            obj.setIcon(plantIcon);
                            obj.setZIndexOffset(-1000);
                        }

                        e.target.setIcon(L.icon({
                            iconUrl: './assets/images/plant.healthy.png',
                            iconSize: [35, 35]
                        }));

                        e.target.setZIndexOffset(1000);
                    })
                }

                this.plantsLayer.addLayer(marker);
                this.plantsLayer.addTo(this.mymap);
            }
        }

        // sensors changed
        if(changes.sensors && changes.sensors.firstChange == false ){
            console.log("Map Sensors: " + this.sensors.length);

            //to do: clear layers
            this.sensorsLayer.clearLayers();
            var sensorIcon = L.icon({
                iconUrl: './assets/images/sensor.png',

                iconSize:     [25, 25] // size of the icon
                // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            
            for(var i=0; i<this.sensors.length; i++){
                let arg = this.sensors[i];
                let latlng = new L.LatLng(arg.lat, arg.lng);
                let marker = L.marker(latlng, {icon: sensorIcon});
                if(!this.disableInteraction){
                    marker.on('click', (e)=>{
                        this.onSelect('sensor', arg);

                        var layer: any;
                        for(layer in this.sensorsLayer["_layers"]){
                            var obj = this.sensorsLayer["_layers"][layer];
                            obj.setIcon(sensorIcon);
                            obj.setZIndexOffset(-1000);
                        }

                        e.target.setIcon(L.icon({
                            iconUrl: './assets/images/sensor.png',
                            iconSize: [35, 35]
                        }));
                        e.target.setZIndexOffset(1000);
                    });
                }
                this.sensorsLayer.addLayer(marker);
                this.sensorsLayer.addTo(this.mymap);
            }
        }
    }

    private onSelect(type:string, arg){
        if(type == "plant") this.selectPlant.emit(arg.plant_id);
        if(type == "sensor") this.selectSensor.emit(arg.sensor_name);
    }
}