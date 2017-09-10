import { OnChange } from 'ngx-bootstrap/ng2-bootstrap';
import { Component, Input, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';

import { Farm } from './models/farm';
import { Site } from './models/site';

@Component({
    selector: 'download-sensor-data',
    templateUrl: './downloads.sensor-data.component.html',
    styleUrls: ['./downloads.sensor-data.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class DownloadSensorDataComponent implements AfterViewInit, OnChanges{
    from: Date;
    to: Date;

    @Input() selectedFarm: Farm;
    @Input() sites: Site[];
    @Input() availableDates: any;

    selectedSiteID = 'all';

    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService
    ) {
    }

    ngAfterViewInit() {
        console.log(this.availableDates);
        $('#sensorFromDate').datepicker({
            onSelect: (data, inst) => {
                this.from = data;
            },
            dateFormat : "yy-mm-dd"
        });
        $('#sensorToDate').datepicker({
            onSelect: (data, inst) => {
                this.to = data;
            },
            dateFormat: "yy-mm-dd"
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        if(changes.availableDates && this.availableDates != undefined && changes.availableDates.firstChange === false) {
            console.log(this.availableDates);
            if(this.availableDates.minDate == null){
                $('#sensorFromDate').prop('disabled', true);
                $('#sensorToDate').prop('disabled', true);
            } else if(this.availableDates != undefined) {
                $('#sensorFromDate').datepicker("option", "maxDate", new Date(this.availableDates.maxDate.toString()));
                $('#sensorFromDate').datepicker("option", "minDate", new Date(this.availableDates.minDate.toString()));
                $('#sensorToDate').datepicker("option", "maxDate", new Date(this.availableDates.maxDate.toString()));
                $('#sensorToDate').datepicker("option", "minDate", new Date(this.availableDates.minDate.toString()));
            }
        }
    }

    public downloadSensorData() {
        let data: any;
        this.apiService.getSensorsFilterDownloadLink(
            this.sessionService.getLoggedInKey(),
            this.selectedFarm.farm_id.toString(),
            this.selectedSiteID,
            this.from,
            this.to
        ).subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                console.log(data);
                window.open(data.dl_link, '_blank');
            }
        );
    }

}
