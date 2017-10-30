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

export class SensorListComponent implements AfterViewInit {
    @Input() farms: Farm[] = [];
    @Input() selectedFarm: Farm = new Farm();
    @Input() sensors: Sensor[] = [];
    @Input() selectedSensorName = '';
    @Input() sites: Site[];
    selectedSensorReadings: SensorReading[] = [];
    zoomTo: number[] = undefined;
    @Output() selectSensor = new EventEmitter<{}>();
    err: boolean;
    msg: string;

    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService
        ) {
            this.err = false;
    }

    ngAfterViewInit() {
        const hideList = ($('#searchSensor').val() === '' || $('#searchSensor').val() === undefined);
        if (hideList) {
            $('#searchList').hide();
            $('#xButton').hide();
        }
    }

    public onSelectSensor(id: string){
        this.selectSensor.emit(id);
        const selected: any = $.grep(this.sensors, function(e){ return e.sensor_name === id; });
        $('#searchSensor').val(selected[0].sensor_name);
        this.zoomTo = [selected[0].lat, selected[0].lng];
        this.hideListNow();
    }

    public onSelectSite(val) {
        this.sensors = [];
        this.selectedSensorName = undefined;
        let data: any;
        // console.log('selected site: ' + siteID)
        this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString(), val.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.sensors = data.data;
            }
        );
    }

    public downloadSensor(){
        this.err = false;
        if (this.selectedSensorName !== '') {
            let data: any;
            this.apiService.getSensorCSVDownloadLink(this.sessionService.getLoggedInKey(), this.selectedSensorName)
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    if (data.Success) {
                        window.open(data.dl_link, '_blank');
                    } else {
                        this.err = true;
                        this.msg = 'Error: ' + data.error_message;
                    }
                }
            );
        }
    }

    public hideListNow(){
        $('#searchList').hide();
    }

    public searchSensors(str: string) {
        const hideList = ($('#searchSensor').val() === '' || $('#searchSensor').val() === undefined);
        if (hideList) {
            $('#searchList').hide();
            $('#xButton').hide();
        } else {
            $('#searchList').show();
            $('#xButton').show();
        }


        // Declare variables
        let input, filter, ul, li, a, i;
        input = $('#searchSensor');
        filter = input.val().toUpperCase();
        ul = $('#searchList');
        li = ul.find('li');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName('a')[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = '';
            } else {
                li[i].style.display = 'none';
            }
        }

    }

    public clearSearchSensor() {
        $('#searchSensor').val('');
        $('#xButton').hide();
        $('#searchList').hide();
    }



    public onselect(val){
        this.sensors = [];
        this.selectedSensorReadings = undefined;
        this.selectedSensorName = '';
        this.selectSite(val);
    }

    public selectSite(siteID: number){
        let data: any;
        // console.log('selected site: ' + siteID)
        this.apiService.getSensorList(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString(), siteID.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.sensors = data.data;
                // console.log('sensor count: '+this.sensors.length);
                // console.log(this.sensors);
            }
        );
    }
}
