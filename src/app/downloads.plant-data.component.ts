import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
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

export class DownloadPlantDataComponent implements AfterViewInit, OnChanges{
    from: Date = undefined;
    to: Date = undefined;
    health = 'all';
    err: boolean;
    msg: string;

    @Input() selectedFarm: Farm;
    @Input() sites: Site[];
    @Input() availableDates: any;

    selectedSiteID = 'all';

    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService
    ) {
        this.err = false;
    }

    ngAfterViewInit() {
        $('#plantFromDate').datepicker({
            onSelect: (data, inst) => {
                this.from = data;
                $('#plantToDate').datepicker('option', 'minDate', new Date(this.from));
            },
            dateFormat : "yy-mm-dd",
        });
        $('#plantToDate').datepicker({
            onSelect: (data, inst) => {
                this.to = data;
                $('#plantFromDate').datepicker('option', 'maxDate', new Date(this.to));
            },
            dateFormat: "yy-mm-dd",
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        if(changes.availableDates && this.availableDates != undefined && changes.availableDates.firstChange === false) {
            console.log(this.availableDates);

            if(this.availableDates.minDate == null){ 
                $('#plantFromDate').prop('disabled', true);
                $('#plantToDate').prop('disabled', true);
            } else {
                $('#plantFromDate').prop('disabled', false);
                $('#plantToDate').prop('disabled', false);
                $('#plantFromDate').datepicker("option", "maxDate", new Date(this.availableDates.maxDate.toString()));
                $('#plantFromDate').datepicker("option", "minDate", new Date(this.availableDates.minDate.toString()));
                $('#plantToDate').datepicker("option", "maxDate", new Date(this.availableDates.maxDate.toString()));
                $('#plantToDate').datepicker("option", "minDate", new Date(this.availableDates.minDate.toString()));
            }
        }
        if(changes.selectedFarm && changes.selectedFarm.firstChange === false) {
            this.from = undefined;
            this.to = undefined;
            this.health = 'all'
            this.selectedSiteID = 'all';
            $('#plantFromDate').val('');
            $('#plantToDate').val('');
        }
    }

    public downloadPlantData() {
        let data: any;
        this.err = false;
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
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        );
    }
}
