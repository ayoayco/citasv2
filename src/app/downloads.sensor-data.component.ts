import { Component, Input, AfterViewInit } from '@angular/core';
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

export class DownloadSensorDataComponent implements AfterViewInit{
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
        const noData = !(this.availableDates.minData && this.availableDates.maxData);
        $('#sensorFromDate').datepicker({
            onSelect: (data, inst) => {
                this.from = data;
            },
            dateFormat: "yy-mm-dd",
            minData: new Date(this.availableDates.minData),
            maxData: new Date(this.availableDates.maxData)
        });
        $('#sensorToDate').datepicker({
            onSelect: (data, inst) => {
                this.to = data;
            },
            dateFormat: "yy-mm-dd",
            minData: new Date(this.availableDates.minData),
            maxData: new Date(this.availableDates.maxData)
        });
        if(noData) {
            $('#sensorFromDate').prop('disabled', true);
            $('#sensorToDate').prop('disabled', true);
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
