import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';

@Component({
    selector: 'app-about-events',
    templateUrl: './about-events.component.html',
    styleUrls: ['./about-events.component.css'],
    providers: [
        CitasApiService
    ]
})

export class AppAboutEventsComponent {
    events: any[];
    dates: Date[];
    selectedEvent: any;
    constructor(private apiService: CitasApiService) {
        let data: any;
        this.apiService.getEvents()
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.events = data.data;
                for (let i = 0; i < this.events.length; i++) {
                    let datestr = this.events[i].date_from;
                    datestr = datestr.replace(/-/g, '/');
                    this.events[i].date_from = new Date(datestr);
                    datestr = this.events[i].date_to;
                    datestr = datestr.replace(/-/g, '/');
                    this.events[i].date_to = new Date(datestr);
                }
                this.events.sort(function(a, b){
                    return (new Date(b.date_from).getTime() - new Date(a.date_from).getTime());
                });
            },
            err => {
                console.error(err);
                alert('There was an error in communicating with the backend API.');
            }
        );
    }

    public selectEvent(event) {
        this.selectedEvent = event;
    }
    public isOneDay(event) {
        event.date_from.setHours(0, 0, 0, 0);
        event.date_to.setHours(0, 0, 0, 0);

        if (event.date_from.valueOf() === event.date_to.valueOf()) {
            return true;
        }
        return false;
    }
}
