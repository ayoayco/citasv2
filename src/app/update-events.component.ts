import { Component, AfterViewInit } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'update-events',
    templateUrl: './update-events.component.html',
    styleUrls: ['./update-events.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class UpdateEventsComponent implements AfterViewInit {
    events: any[];
    new: any = {};
    err: boolean;
    msg: string;
    deleteType: string;
    deleteEntry: number;
    selectedEvent: any = {};

    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService,
        private router: Router,
        private titleService: Title
    ) {
        this.err = false
        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn) {
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('Update Event List');
        }

        let data;

        this.apiService.getEvents()
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.events = data.data;
                console.log(this.events);
            }
        )

    }

    public addEvent(){
        console.log(this.new);
        let data: any;
        this.apiService.addEvent(
            this.sessionService.getLoggedInKey(),
            this.new.event_name,
            this.new.event_venue,
            this.new.description,
            this.new.date_from,
            this.new.date_to)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                console.log(data);
                if (data.Success) {
                    window.location.reload();
                    $('#addEventModal').modal('hide');
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )
    }

    public deleteEntryNow() {
        console.log('Delete: ' + this.deleteType + ' ' + this.deleteEntry);
        let data: any;
        this.apiService.deleteEntry(this.sessionService.getLoggedInKey(), this.deleteType, this.deleteEntry)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                if (data.Success) {
                    window.location.reload();
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )
    }

    public uploadPhotoNow() {
        const files = $('#fileField').prop('files');
        const file = files[0];
        console.log(file);
        /*
        let data: any;
        this.apiService.uploadImage(this.sessionService.getLoggedInKey(), this.selectedEvent.event_id, 'event', file)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                console.log(data);
                if(data.Success){
                    window.location.reload();
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )
        */
    }

    public uploadPhoto(event: any) {
        this.selectedEvent = event;
        console.log('Upload photo for: ' + this.selectedEvent.name);
        $('#uploadPhotoModal').modal('toggle');
    }

    public editEventNow() {
        let data: any;
        this.apiService.editEvent(
            this.sessionService.getLoggedInKey(),
            this.selectedEvent.event_name,
            this.selectedEvent.event_venue,
            this.selectedEvent.event_description,
            this.selectedEvent.date_from,
            this.selectedEvent.date_to,
            this.selectedEvent.event_id
        ).subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                console.log(data);
                if (data.Success) {
                    window.location.reload();
                } else {
                    this.err = true;
                    this.msg = 'Error: ' + data.error_message;
                }
            }
        )
    }

    public editEvent(event) {
        this.selectedEvent = event;
        this.selectedEvent.date_from = this.formatDate(event.date_from);
        this.selectedEvent.date_to = this.formatDate(event.date_to);
        console.log('Edit: ' + this.selectedEvent);

        $('#editEventModal').modal('toggle');
    }

    public viewEvent(event) {
        this.selectedEvent = event;
        console.log(this.selectedEvent);
        $('#viewEventModal').modal('toggle');
    }

    public formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }

        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    public selectDelEvent(id) {
        this.deleteEntry = id;
        this.deleteType = 'event';
        $('#surePrompt').modal('toggle');
    }

    ngAfterViewInit() {
        $('#date_to').datepicker({
            onSelect: (data, inst) => {
                this.new.date_to = data;
            },
            dateFormat: 'yy-mm-dd',
        });
        $('#date_from').datepicker({
            onSelect: (data, inst) => {
                this.new.date_from = data;
            },
            dateFormat: 'yy-mm-dd',
        });
        $('#edit_date_to').datepicker({
            onSelect: (data, inst) => {
                this.selectedEvent.date_to = data;
            },
            dateFormat: 'yy-mm-dd',
        });
        $('#edit_date_from').datepicker({
            onSelect: (data, inst) => {
                this.selectedEvent.date_from = data;
            },
            dateFormat: 'yy-mm-dd',
        });

    }

}
