import { Component, Input, OnChanges, AfterViewInit } from '@angular/core';
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
    mymap: L.Map;

    constructor(
        private apiService: CitasApiService,
        private sessionService: AppSessionService
    ){
    }

    ngAfterViewInit(){

        this.mymap = new L.Map("map-div", {
            center: new L.LatLng(12.4, 122.4),
            zoom: 5.5,
        });

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            // to do: change these...
            id: 'jenjereren.16nj7dd6',
            accessToken: 'pk.eyJ1IjoiamVuamVyZXJlbiIsImEiOiJjaXM2ODlkNmcwZDlnMnlvMGswNmpldWUwIn0.eCh8h5prpNCamLH_zbYHoA'
        }).addTo(this.mymap);
    }


    ngOnChanges(changes){
        // selectedFarm changed
        if(changes.selectedFarm && changes.selectedFarm.firstChange == false ){
            console.log("Map Farm: " + this.selectedFarm.farm_name);
            let data: any;
            this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
            .then(
                res => {
                    data = res.data[0];
                    if(data){
                        console.log(data);
                        var center = new L.LatLng(data.center[0], data.center[1]);
                        var zoom = 0;
                        switch(data.farm_size){
                            case "large": zoom = 14 ; break;
                            case "small": zoom = 15 ; break;
                            default: zoom = 14; break;
                        }
                        this.mymap.setView(center, zoom);
                        var polygon = L.polygon(data.geometry).addTo(this.mymap);
                    }
                }
            );
        }  

        // plants changed
        if(changes.plants && changes.plants.firstChange == false ){
            console.log("Map Plants: " + this.plants.length);
            console.log(this.plants);
        /*    var plantIcon = L.icon({
                iconUrl: 'leaf-green.png',

                iconSize:     [38, 95], // size of the icon
                iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            for(var i=0; i<this.plants.length; i++){
                var marker = L.marker([this.plants[i].lat, this.plants[i].lng]).addTo(this.mymap);
            }
        */
        }
    
        // sensors changed
        if(changes.sensors && changes.sensors.firstChange == false ){
            console.log("Map Sensors: " + this.sensors.length);
        }
        // console.log("Changes!!!");
        // console.log(changes);
    }
}