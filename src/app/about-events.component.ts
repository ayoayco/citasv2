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
    constructor(private apiService: CitasApiService){
        let data: any;
        this.apiService.getEvents()
        .then(
            res => {
                data = res;
                this.events = data.data;
                this.events.sort(function(a,b){
                    return (new Date(b.date_from).getTime() - new Date(a.date_from).getTime());
                })
                console.log(this.events);
            }
        );
    }

    public isOneDay(event){
        if(event.date_from == event.date_to){
            return true;
        }
        else{
            return false;
        }
    }
}