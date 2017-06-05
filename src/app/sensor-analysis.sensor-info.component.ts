import { Component, Input } from '@angular/core';

@Component({
    selector: 'sensor-info',
    templateUrl: './sensor-analysis.sensor-info.component.html',
    styleUrls: ['./sensor-analysis.sensor-info.component.css']
})

export class SensorAnalysisSensorInfoComponent{
    @Input() readings: any = undefined;
    @Input() selectedSensorName: string ="";
    
    constructor(){
    }
}