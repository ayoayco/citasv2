import { Component, Input, AfterViewInit } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';

import { Farm } from './models/farm';
import { Site } from './models/site';

@Component({
    selector: 'download-plant-data',
    templateUrl: './downloads.plant-data.component.html',
    styleUrls: ['./downloads.plant-data.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class DownloadPlantDataComponent implements AfterViewInit {
    from: Date;
    to: Date;
    health = 'all';
    error = '';

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
        const noData = !(this.availableDates.minDate && this.availableDates.maxDate);
        $('#plantFromDate').datepicker({
            onSelect: (data, inst) => {
                this.from = data;
            },
            dateFormat : "yy-mm-dd",
            minDate: new Date(this.availableDates.minDate),
            maxDate: new Date(this.availableDates.maxDate)
        });
        $('#plantToDate').datepicker({
            onSelect: (data, inst) => {
                this.to = data;
            },
            dateFormat: "yy-mm-dd",
            minDate: new Date(this.availableDates.minDate),
            maxDate: new Date(this.availableDates.maxDate)
        });
        if(noData) {
            $('#plantFromDate').prop('disabled', true);
            $('#plantToDate').prop('disabled', true);
        }
    }

    public downloadPlantData() {
        let data: any;
        this.apiService.getPlantsFilterDownloadLink(
            this.sessionService.getLoggedInKey(),
            this.selectedFarm.farm_id.toString(),
            this.selectedSiteID,
            this.health,
            this.from,
            this.to
        ).subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                // console.log(data);
                if (data.Success) {
                    window.open(data.dl_link, '_blank');
                } else {
                    this.error = data.err;
                    // console.log(this.error);
                }
            }
        );
    }
}
