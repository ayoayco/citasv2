import { Component, NgZone, Input, Output, OnChanges, AfterViewInit, EventEmitter, SimpleChanges } from '@angular/core';
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
    
    @Input() clearOverlay:boolean;
    @Input() showHumid: boolean;
    @Input() showPress: boolean;
    @Input() showTemp: boolean;

    @Input() showSites: boolean;
    @Input() showSensors: boolean;
    @Input() showPlants: boolean;
    @Input() showSamplings: boolean;

    @Input() fullMap: boolean;
    @Input() height: number;
    @Input() disableInteraction: boolean;

    @Input() selectedFarm: Farm;
    @Input() sensors: any[];
    @Input() plants: any[];

    @Input() zoomControl: boolean = true;
    @Input() touchZoom: boolean = true;

    @Input() resize: number;

    @Output() selectPlant = new EventEmitter<{}>();
    @Output() selectSensor = new EventEmitter<{}>();

    mymap: L.Map;
    farmLayer: L.LayerGroup;
    sitesLayer: L.LayerGroup;
    plantsLayer: L.LayerGroup;
    sensorsLayer: L.LayerGroup;
    weatherLayer: L.LayerGroup;

    plantIcon: any;
    sensorIcon: any;

    overlayBounds = {
        north: 21.628,
        south: 3.99,
        east: 128.285,
        west: 115.35
    };


    constructor(
        private apiService: CitasApiService,
        private sessionService: AppSessionService,
        private ngZone: NgZone
    ){
        this.farmLayer = L.layerGroup([]);
        this.sitesLayer = L.layerGroup([]);
        this.plantsLayer = L.layerGroup([]);
        this.sensorsLayer = L.layerGroup([]);
        this.weatherLayer = L.layerGroup([]);
        

        this.plantIcon = L.icon({
            iconUrl: './assets/images/plant.healthy.png',

            iconSize:     [25, 25] // size of the icon
            // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        this.sensorIcon = L.icon({
            iconUrl: './assets/images/sensor.png',

            iconSize:     [25, 25] // size of the icon
            // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        window.onresize = (e) =>
        {
            if(this.fullMap){
                //ngZone.run will help to run change detection
                this.ngZone.run(() => {
                    var ht = $('map').parent().height();
                    console.log('Full Map! Height of map should be: '+ht);
                    $('div#map-div').css('height', ht+'px');
                    this.mymap.invalidateSize();
                });
            }
        };

    }

    ngAfterViewInit(){

        var dragging = true;
        var doubleClickZoom = true;
        var boxZoom = true;
        var trackResize = true;
        var scrollWheelZoom = true;

        if(!this.fullMap){
            $('div#map-div').css('height', this.height+'px');
            console.log('Not full! Height of map should be: '+this.height);
        }else{
            var ht = $('map').parent().height();
            console.log('Full Map! Height of map should be: '+ht);
            $('div#map-div').css('height', ht+'px');
        }

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

    private plotFarm(){
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
                    if(this.fullMap){
                        zoom += 1;
                    }
                    this.mymap.setView(center, zoom);
                    let polygon = L.polygon(data.geometry, {color: 'black', fillOpacity: 0});
                    this.farmLayer.addLayer(polygon);
                    this.farmLayer.addTo(this.mymap);
                }
            }
        );
    }

    private plotSites(){// get sites in farm
        let data: any;
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

    private plotPlants(){
        {
            console.log("Map Plants: " + this.plants.length);

            //to do: clear layers
            this.plantsLayer.clearLayers();
            
            console.log(this.plants);

            for(var i=0; i<this.plants.length; i++){
                let arg = this.plants[i];
                let latlng = new L.LatLng(arg.lat, arg.lng);
                let marker = L.marker(latlng, {icon: this.plantIcon});

                if(!this.disableInteraction){
                    marker.on('click', (e)=>{
                        this.onSelect('plant', arg);

                        var layer: any;

                        for(layer in this.sensorsLayer["_layers"]){
                            var obj = this.sensorsLayer["_layers"][layer];
                            obj.setIcon(this.sensorIcon);
                            obj.setZIndexOffset(-1000);
                        }

                        for(layer in this.plantsLayer["_layers"]){
                            var obj = this.plantsLayer["_layers"][layer];
                            obj.setIcon(this.plantIcon);
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
    }

    private plotSensors(){
        console.log("Map Sensors: " + this.sensors.length);

        //to do: clear layers
        this.sensorsLayer.clearLayers();
        
        for(var i=0; i<this.sensors.length; i++){
            let arg = this.sensors[i];
            let latlng = new L.LatLng(arg.lat, arg.lng);
            let marker = L.marker(latlng, {icon: this.sensorIcon});
            if(!this.disableInteraction){
                marker.on('click', (e)=>{
                    this.onSelect('sensor', arg);

                    var layer: any;
                    for(layer in this.sensorsLayer["_layers"]){
                        var obj = this.sensorsLayer["_layers"][layer];
                        obj.setIcon(this.sensorIcon);
                        obj.setZIndexOffset(-1000);
                    }

                    for(layer in this.plantsLayer["_layers"]){
                        var obj = this.plantsLayer["_layers"][layer];
                        obj.setIcon(this.plantIcon);
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

    private plotPress(){
        this.weatherLayer.clearLayers();
        var southWest = L.latLng(this.overlayBounds.south, this.overlayBounds.west),
            northEast = L.latLng(this.overlayBounds.north, this.overlayBounds.east),
            bounds = new L.LatLngBounds(southWest, northEast);

        var overlay = new L.ImageOverlay("http://noah.dost.gov.ph/static/img/latest_contours/air_pressure_contour.png", bounds, {
			opacity: 0.4,
			interactive: true,
			attribution: 'Air Pressure Contour &copy; UP-NOAH'
		});

        this.weatherLayer.addLayer(overlay);
        this.weatherLayer.addTo(this.mymap);
    }

    private plotTemp(){
        this.weatherLayer.clearLayers();
        var southWest = L.latLng(this.overlayBounds.south, this.overlayBounds.west),
            northEast = L.latLng(this.overlayBounds.north, this.overlayBounds.east),
            bounds = new L.LatLngBounds(southWest, northEast);

        var overlay = new L.ImageOverlay("http://noah.dost.gov.ph/static/img/latest_contours/air_temperature_contour.png", bounds, {
			opacity: 0.4,
			interactive: true,
			attribution: 'Air Temparature Contour &copy; UP-NOAH'
		});

        this.weatherLayer.addLayer(overlay);
        this.weatherLayer.addTo(this.mymap);
    }

    private plotHumid(){
        this.weatherLayer.clearLayers();
        var southWest = L.latLng(this.overlayBounds.south, this.overlayBounds.west),
            northEast = L.latLng(this.overlayBounds.north, this.overlayBounds.east),
            bounds = new L.LatLngBounds(southWest, northEast);

        var overlay = new L.ImageOverlay("http://noah.dost.gov.ph/static/img/latest_contours/air_humidity_contour.png", bounds, {
			opacity: 0.4,
			interactive: true,
			attribution: 'Air Humidity Contour &copy; UP-NOAH'
		});

        this.weatherLayer.addLayer(overlay);
        this.weatherLayer.addTo(this.mymap);
    }

    ngOnChanges(changes: SimpleChanges){

        if(changes.clearOverlay && changes.clearOverlay.firstChange == false){
            if(this.clearOverlay){
                this.weatherLayer.clearLayers();
            }
        }

        if(changes.showHumid && changes.showHumid.firstChange == false){
            if(this.showHumid){
                this.plotHumid();
            }
        }

        if(changes.showPress && changes.showPress.firstChange == false){
            if(this.showPress){
                this.plotPress();
            }
        }

        if(changes.showTemp && changes.showTemp.firstChange == false){
            if(this.showTemp){
                this.plotTemp();
            }
        }

        if(changes.showSensors && changes.showSensors.firstChange == false ){
            if(this.showSensors){
                this.plotSensors();
            }else{
                this.sensorsLayer.clearLayers();
            }
        }

        if(changes.showPlants && changes.showPlants.firstChange == false ){
            if(this.showPlants){
                this.plotPlants();
            }else{
                this.plantsLayer.clearLayers();
            }
        }
        
        if(changes.showSites && changes.showSites.firstChange == false ){
            if(this.showSites){
                this.plotSites();
            }else{
                this.sitesLayer.clearLayers();
            }
        }

        if(changes.resize && changes.resize.firstChange == false ){
            console.log('map resized for '+this.resize+' time(s)!' );
            document.getElementById('map-div').style.display = 'block';
            this.mymap.invalidateSize();
        }

        // selectedFarm changed
        if(changes.selectedFarm && changes.selectedFarm.firstChange == false ){
            this.plotFarm();
            this.plotSites();
        }  

        // plants changed
        if(changes.plants && changes.plants.firstChange == false ){
            this.plotPlants();
        }

        // sensors changed
        if(changes.sensors && changes.sensors.firstChange == false ){
            this.plotSensors();
        }
    }

    private onSelect(type:string, arg){
        if(type == "plant") this.selectPlant.emit(arg.plant_id);
        if(type == "sensor") this.selectSensor.emit(arg.sensor_name);
    }
}