import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';

@Component({
    selector: 'download-sensor-data',
    templateUrl: './downloads.sensor-data.component.html',
    styleUrls: ['./downloads.sensor-data.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class DownloadSensorDataComponent{
    from: Date;
    to: Date;
    
    constructor(private apiService: CitasApiService, private sessionService: AppSessionService){

    }

    public downloadSensorData(){
        let data: any;
        this.apiService.getSensorsAllDownloadLink(this.sessionService.getLoggedInKey(), this.from, this.to)
        .then(
            res => {
                data = res;
                console.log(data);
                window.open(data.dl_link, '_blank');
            }
        );
    }

}