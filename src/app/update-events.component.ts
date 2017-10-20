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
            this.new.event_description,
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

    }

}
