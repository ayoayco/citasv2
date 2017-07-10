import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { CitasApiService } from './citas.api.service';

import { Farm } from './models/farm';
import { Sensor } from './models/sensor';
import { Site } from './models/site';
import { SensorReading } from './models/sensor-reading';

@Component({
    selector: 'sensor-list',
    templateUrl: './sensor-list.component.html',
    styleUrls: ['./sensor-list.component.css']
})

export class SensorListComponent implements AfterViewInit{
    
    @Input() farms: Farm[] = [];
    @Input() selectedFarm: Farm = new Farm();
    @Input() sensors: Sensor[] = [];
    @Input() selectedSensorName: string = "";
    @Input() sites: Site[];
    selectedSensorReadings: SensorReading[] = [];
    
    zoomTo: number[] = undefined;
    
    @Output() selectSensor = new EventEmitter<{}>();

    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService
        ){
    }

    ngAfterViewInit(){
        var hideList = ($('#searchSensor').val() == "" || $('#searchSensor').val() == undefined);
        if(hideList){
            $('#searchList').hide();
            $('#xButton').hide();
        }
    }

    public onSelectSensor(id: string){
        console.log("Select sensor: " + id);
        this.selectSensor.emit(id);
        let selected: any = $.grep(this.sensors, function(e){ return e.sensor_name == id });
        console.log(selected[0]);
        $('#searchSensor').val(selected[0].sensor_name);
        this.zoomTo = [selected[0].lat, selected[0].lng];
        console.log(this.zoomTo);
        this.hideListNow();
    }

    public onSelectSite(val){
        this.sensors = [];
        this.selectedSensorName = undefined;
        let data: any;
        //console.log('selected site: ' + siteID)
        this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString(), val.toString())
        .then(
            res => {
                data = res;
                this.sensors = data.data;
            }
        );
    }

    public downloadSensor(){
        if(this.selectedSensorName != ""){
            let data: any;
            this.apiService.getSensorCSVDownloadLink(this.sessionService.getLoggedInKey(), this.selectedSensorName)
            .then(
                res => {
                    data = res;
                    //console.log(data);
                    window.open(data.dl_link, '_blank');
                }
            )
        }
    }

    public hideListNow(){
        $('#searchList').hide();
    }

    public searchSensors(str: string){
        
        var hideList = ($('#searchSensor').val() == "" || $('#searchSensor').val() == undefined);
        if(hideList){
            $('#searchList').hide();
            $('#xButton').hide();
        }else{
            $('#searchList').show();
            $('#xButton').show();
        }


        // Declare variables
        var input, filter, ul, li, a, i;
        input = $('#searchSensor');
        filter = input.val().toUpperCase();
        ul = $('#searchList');
        li = ul.find('li');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }

    }

    public clearSearchSensor(){
        $('#searchSensor').val("");
        $('#xButton').hide();
        $('#searchList').hide();
    }



    public onselect(val){
        this.sensors = [];
        this.selectedSensorReadings = undefined;
        this.selectedSensorName = "";
        this.selectSite(val);
    }

    public selectSite(siteID: number){
        let data: any;
        //console.log('selected site: ' + siteID)
        this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString(), siteID.toString())
        .then(
            res => {
                data = res;
                this.sensors = data.data;
                //console.log("sensor count: "+this.sensors.length);
                //console.log(this.sensors);
            }
        );
    }
}