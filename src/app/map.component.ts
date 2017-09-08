import { Component, NgZone, Input, Output, OnChanges, AfterViewInit, EventEmitter, SimpleChanges } from '@angular/core';
import { Farm } from './models/farm';
import { Sensor } from './models/sensor';
import { Site } from './models/site';
import { Plant } from './models/plant';

declare const L: any;

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit, OnChanges {

    @Input() editable: boolean;
    @Input() drawable: boolean;
    @Input() zoomTo: number[];

    @Input() clearOverlay: boolean;
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

    @Input() selectedFarm: Farm = undefined;
    @Input() sensors: any[];
    @Input() plants: any[];
    @Input() sites: Site[];
    @Input() samplings: any;

    @Input() zoomControl = true;
    @Input() touchZoom = true;

    @Input() resize: number;

    @Output() selectPlant = new EventEmitter < {} > ();
    @Output() selectSensor = new EventEmitter < {} > ();
    @Output() setSoilChar = new EventEmitter < {} > ();
    @Output() setFarmInfo = new EventEmitter < {} > ();

    mymap: L.Map;
    farmLayer: L.LayerGroup;
    sitesLayer: L.LayerGroup;
    plantsLayer: L.LayerGroup;
    sensorsLayer: L.LayerGroup;
    weatherLayer: L.LayerGroup;
    samplingsLayer: L.LayerGroup;
    center: L.LatLng;
    bounds: any[];
    zoom: number;

    plantIcon: any;
    sensorIcon: any;

    overlayBounds = {
        north: 21.628,
        south: 3.99,
        east: 128.285,
        west: 115.35
    };

    constructor(
        private ngZone: NgZone
    ) {
        this.bounds = [];
        this.farmLayer = L.layerGroup([]);
        this.sitesLayer = L.layerGroup([]);
        this.plantsLayer = L.layerGroup([]);
        this.sensorsLayer = L.layerGroup([]);
        this.weatherLayer = L.layerGroup([]);
        this.samplingsLayer = L.layerGroup([]);


        this.plantIcon = L.icon({
            iconUrl: './assets/images/plant.healthy.png',

            iconSize: [25, 25] // size of the icon
                // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        this.sensorIcon = L.icon({
            iconUrl: './assets/images/sensor.png',

            iconSize: [25, 25] // size of the icon
                // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        window.onresize = (e) => {
            if (this.fullMap) {
                // ngZone.run will help to run change detection
                this.ngZone.run(() => {
                    const ht = $('map').parent().height();
                    // console.log('Full Map! Height of map should be: '+ht);
                    $('div#map-div').css('height', ht + 'px');
                    this.mymap.invalidateSize(true);
                });
            }
        };

    }

    ngAfterViewInit() {
        let dragging = true;
        let doubleClickZoom = true;
        let boxZoom = true;
        let trackResize = true;
        let scrollWheelZoom = true;

        if (!this.fullMap) {
            $('div#map-div').css('height', this.height + 'px');
            // console.log('Not full! Height of map should be: '+this.height);
        } else {
            const ht = $('map').parent().height();
            // console.log('Full Map! Height of map should be: '+ht);
            $('div#map-div').css('height', ht + 'px');
        }

        if (this.disableInteraction) {
            dragging = false;
            doubleClickZoom = false;
            boxZoom = false;
            trackResize = false;
            scrollWheelZoom = false;
        }

        const center = new L.LatLng(12.4, 122.4);

        // initialize map
        this.mymap = new L.Map('map-div', {
            zoomControl: this.zoomControl,
            touchZoom: this.touchZoom,
            center: center,
            zoom: 5.5,
            dragging: dragging,
            doubleClickZoom: doubleClickZoom,
            boxZoom: boxZoom,
            trackResize: trackResize,
            scrollWheelZoom: scrollWheelZoom
        });

        if (this.drawable) {
            // FeatureGroup is to store editable layers
            const drawnItems = new L.FeatureGroup([]);
            this.mymap.addLayer(drawnItems);
            const drawControl = new L.Control.Draw({
                position: 'topright',
                edit: {
                    featureGroup: drawnItems
                },
                draw: {
                    polygon: {
                        allowIntersection: false,
                        showArea: true
                    },
                    polyline : false,
                    rectangle : false,
                    circle : false,
                    marker: false
               }
            });
            this.mymap.addControl(drawControl);

            let data: any;

            this.mymap.on(L.Draw.Event.CREATED,
                res => {
                    data = res;
                    console.log(data);
                    const arr = [];
                    const layer = data.layer;

                    if (layer._latlngs.length > 0) {
                        const latlngs = layer._latlngs[0];
                        for (let i = 0; i < latlngs.length; i++) {
                            arr.push([latlngs[i].lat, latlngs[i].lng]);
                        }
                        const area = L.GeometryUtil.geodesicArea(layer._latlngs[0]);
                        this.setFarmInfo.emit({'latlngs': arr, 'area': area});
                    }else if (layer) {
                        console.log(layer);
                    }
                    drawnItems.addLayer(layer);
                }
            );
        }

        L.control.scale().addTo(this.mymap);

        // base map
        const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(this.mymap);

    }

    private plotFarm() {
        // console.log('plot farm');
        if(this.editable) {
            // FeatureGroup is to store editable layers
            const drawnItems = new L.FeatureGroup([]);
            this.mymap.addLayer(drawnItems);
            const drawControl = new L.Control.Draw({
                position: 'topright',
                edit: {
                    featureGroup: drawnItems,
                    remove: false
                },
                draw: {
                    polygon: false,
                    polyline : false,
                    rectangle : false,
                    circle : false,
                    marker: false
               }
            });
            
            this.mymap.addControl(drawControl);

            let data: any;

            this.mymap.on(L.Draw.Event.EDITVERTEX,
                res => {
                    drawnItems.eachLayer(layer=>{
                        data = layer;
                    });
                    const arr = [];
                    const layer = data;

                    if (layer._latlngs.length > 0) {
                        const latlngs = layer._latlngs[0];
                        for (let i = 0; i < latlngs.length; i++) {
                            arr.push([latlngs[i].lat, latlngs[i].lng]);
                        }
                        const area = L.GeometryUtil.geodesicArea(layer._latlngs[0]);
                        this.setFarmInfo.emit({'latlngs': arr, 'area': area});
                    }else if (layer) {
                        console.error('ERROR: something went wrong.');
                        console.log(layer);
                    }
                    drawnItems.addLayer(layer);
                }
            );
            if (this.selectedFarm.center.length > 0) {
                // to do: clear previous layer
                drawnItems.clearLayers();
                this.farmLayer.clearLayers();
                this.center = new L.LatLng(this.selectedFarm.center[0], this.selectedFarm.center[1]);
                const polygon = L.polygon(this.selectedFarm.geometry);
                drawnItems.addLayer(polygon);
                drawnItems.addTo(this.mymap);
                if(this.bounds.length > 0) this.mymap.fitBounds(this.bounds);
                $('a.leaflet-draw-edit-edit').click();
            }

        }

        // get farm details
        else if (this.selectedFarm.center.length > 0) {
            // to do: clear previous layer
            this.farmLayer.clearLayers();
            this.center = new L.LatLng(this.selectedFarm.center[0], this.selectedFarm.center[1]);
            const polygon = L.polygon(this.selectedFarm.geometry, { color: 'black', fillOpacity: 0 });
            this.farmLayer.addLayer(polygon);
            this.farmLayer.addTo(this.mymap);
            if(this.bounds.length > 0) this.mymap.fitBounds(this.bounds);
        }
    }

    private plotSites() { // get sites in farm
        // console.log('plot sites');

        this.sitesLayer.clearLayers();

        for (let i = 0; i < this.sites.length; i++) {
            let color = 'white';
            switch (this.sites[i].status) {
                case 'infected':
                    color = 'red';
                    break;
                case 'not_infected':
                    color = 'green';
                    break;
                case 'unknown':
                    color = 'white';
                    break;
                default:
                    color = 'white';
            }
            const polygon = L.polygon(this.sites[i].geometry, { color: color }).bindPopup(
                layer => {
                    return this.sites[i].sampling_site_name;
                }
            );
            this.sitesLayer.addLayer(polygon);
            this.sitesLayer.addTo(this.mymap);
            this.resetView();
        }
    }

    private plotPlants() {
        // console.log('plot plants');

        // to do: clear layers
        this.plantsLayer.clearLayers();

        // console.log(this.plants);

        for (let i = 0; i < this.plants.length; i++) {
            const arg = this.plants[i];
            const latlng = new L.LatLng(arg.lat, arg.lng);
            const marker = L.marker(latlng, { icon: this.plantIcon });

            if (!this.disableInteraction) {
                marker.on('click', (e) => {
                    this.onSelect('plant', arg);

                    for (const layer in this.sensorsLayer['_layers']) {
                        if (layer) {
                            const obj = this.sensorsLayer['_layers'][layer];
                            obj.setIcon(this.sensorIcon);
                            obj.setZIndexOffset(-1000);
                        }
                    }

                    for (const layer in this.plantsLayer['_layers']) {
                        if (layer) {
                            const obj = this.plantsLayer['_layers'][layer];
                            obj.setIcon(this.plantIcon);
                            obj.setZIndexOffset(-1000);
                        }
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

    private plotSamplings() {
        // console.log('plot samplings');
        this.samplingsLayer.clearLayers();
        const g = this.samplings;

        const geoJSON: L.GeoJSON = L.geoJSON(g,{
            style: function(feature){
                let color = 'green';

                if (feature.properties['foc'] === 'infected') {
                    color = 'red';
                }

                return {
                    color: color
                };
            }
        }
        );

        this.samplingsLayer.addLayer(geoJSON);
        this.samplingsLayer.addTo(this.mymap);
        this.resetView();
    }

    private resetView() {
        if(this.bounds.length >0) this.mymap.fitBounds(this.bounds);
    }

    private plotSensors() {
        // console.log('plot sensors');

        // to do: clear layers
        this.sensorsLayer.clearLayers();

        for (let i = 0; i < this.sensors.length; i++) {
            const arg = this.sensors[i];
            const latlng = new L.LatLng(arg.lat, arg.lng);
            const marker = L.marker(latlng, { icon: this.sensorIcon });
            if (!this.disableInteraction) {
                marker.on('click', (e) => {
                    this.onSelect('sensor', arg);

                    for (const layer in this.sensorsLayer['_layers']) {
                        if (layer) {
                            const obj = this.sensorsLayer['_layers'][layer];
                            obj.setIcon(this.sensorIcon);
                            obj.setZIndexOffset(-1000);
                        }
                    }

                    for (const layer in this.plantsLayer['_layers']) {
                        if (layer) {
                            const obj = this.plantsLayer['_layers'][layer];
                            obj.setIcon(this.plantIcon);
                            obj.setZIndexOffset(-1000);
                        }
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

    private plotPress() {
        this.weatherLayer.clearLayers();
        const southWest = L.latLng(this.overlayBounds.south, this.overlayBounds.west),
            northEast = L.latLng(this.overlayBounds.north, this.overlayBounds.east),
            bounds = new L.LatLngBounds(southWest, northEast);

        const overlay = new L.ImageOverlay('http://noah.dost.gov.ph/static/img/latest_contours/air_pressure_contour.png', bounds, {
            opacity: 0.4,
            interactive: true,
            attribution: 'Air Pressure Contour &copy; UP-NOAH'
        });

        this.weatherLayer.addLayer(overlay);
        this.weatherLayer.addTo(this.mymap);
    }

    private plotTemp() {
        this.weatherLayer.clearLayers();
        const southWest = L.latLng(this.overlayBounds.south, this.overlayBounds.west),
            northEast = L.latLng(this.overlayBounds.north, this.overlayBounds.east),
            bounds = new L.LatLngBounds(southWest, northEast);

        const overlay = new L.ImageOverlay('http://noah.dost.gov.ph/static/img/latest_contours/air_temperature_contour.png', bounds, {
            opacity: 0.4,
            interactive: true,
            attribution: 'Air Temparature Contour &copy; UP-NOAH'
        });

        this.weatherLayer.addLayer(overlay);
        this.weatherLayer.addTo(this.mymap);
    }

    private plotHumid() {
        this.weatherLayer.clearLayers();
        const southWest = L.latLng(this.overlayBounds.south, this.overlayBounds.west),
            northEast = L.latLng(this.overlayBounds.north, this.overlayBounds.east),
            bounds = new L.LatLngBounds(southWest, northEast);

        const overlay = new L.ImageOverlay('http://noah.dost.gov.ph/static/img/latest_contours/air_humidity_contour.png', bounds, {
            opacity: 0.4,
            interactive: true,
            attribution: 'Air Humidity Contour &copy; UP-NOAH'
        });

        this.weatherLayer.addLayer(overlay);
        this.weatherLayer.addTo(this.mymap);
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.zoomTo && changes.zoomTo.firstChange === false) {
            if (this.zoomTo !== undefined && this.zoomTo.length > 0) {
                const center = new L.LatLng(this.zoomTo[0], this.zoomTo[1]);
                let zoom = 18;
                if (this.fullMap) {
                    zoom++;
                }
                this.mymap.setView(center, zoom);
            }
        }

        if (changes.clearOverlay && changes.clearOverlay.firstChange === false) {
            if (this.clearOverlay) {
                this.weatherLayer.clearLayers();
            }
        }

        if (changes.showHumid && changes.showHumid.firstChange === false) {
            if (this.showHumid) {
                this.plotHumid();
            }
        }

        if (changes.showPress && changes.showPress.firstChange === false) {
            if (this.showPress) {
                this.plotPress();
            }
        }

        if (changes.showTemp && changes.showTemp.firstChange === false) {
            if (this.showTemp) {
                this.plotTemp();
            }
        }

        if (changes.showSamplings && changes.showSamplings.firstChange === false) {
            if (this.showSamplings) {
                this.plotSamplings();
            } else {
                this.samplingsLayer.clearLayers();
            }
        }

        if (changes.showSensors && changes.showSensors.firstChange === false) {
            if (this.showSensors) {
                this.plotSensors();
            } else {
                this.sensorsLayer.clearLayers();
            }
        }

        if (changes.selectedFarm && changes.selectedFarm.firstChange === false) {
            const layer = L.polygon(this.selectedFarm.geometry);
            const latlngs = layer.getLatLngs();
            if(latlngs.length > 0) {
                const l: any = latlngs[0];
                const area = L.GeometryUtil.geodesicArea(l);
                const arr = [];
                for (let i = 0; i < l.length; i++) {
                    arr.push([l[i].lat, l[i].lng]);
                }
                this.bounds = arr;
            }
            this.plotFarm();
        }

        if (changes.showPlants && changes.showPlants.firstChange === false) {
            if (this.showPlants) {
                this.plotPlants();
            } else {
                this.plantsLayer.clearLayers();
            }
        }

        if (changes.showSites && changes.showSites.firstChange === false) {
            if (this.showSites) {
                this.plotSites();
            } else {
                this.sitesLayer.clearLayers();
            }
        }

        if (changes.resize && changes.resize.firstChange === false) {
            // console.log('map resized for '+this.resize+' time(s)!' );
            document.getElementById('map-div').style.display = 'block';
            this.mymap.invalidateSize();
        }

        // plants changed
        if (changes.plants && changes.plants.firstChange === false) {
            this.plotPlants();
        }

        // sensors changed
        if (changes.sensors && changes.sensors.firstChange === false) {
            this.plotSensors();
        }

        // sites changed
        if (changes.sites && changes.sites.firstChange === false) {
            this.plotSites();
        }
    }

    private onSelect(type: string, arg) {
        if (type === 'plant') {
            this.selectPlant.emit(arg.plant_id);
        }
        if (type === 'sensor') {
            this.selectSensor.emit(arg.sensor_name);
        }
    }
}
