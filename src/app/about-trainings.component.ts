import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';

@Component({
    selector: 'app-about-trainings',
    templateUrl: './about-trainings.component.html',
    styleUrls: ['./about-trainings.component.css'],
    providers: [
        CitasApiService
    ]
})

export class AppAboutTrainingsComponent {
    trainings: any[];
    constructor(private apiService: CitasApiService){
        let data: any;
        this.apiService.getTrainings()
        .then(
            res => {
                data = res;
                this.trainings = data.data;
                this.trainings.sort(function(a,b){
                    return (new Date(b.date_from).getTime() - new Date(a.date_from).getTime());
                })
                console.log(this.trainings);
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