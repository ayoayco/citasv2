import { Component, Input } from '@angular/core';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}

@Component({
    selector: 'sensor-info',
    templateUrl: './sensor-analysis.sensor-info.component.html',
    styleUrls: ['./sensor-analysis.sensor-info.component.css'],
    providers: [
        {
        provide: HighchartsStatic,
        useFactory: highchartsFactory
        },
    ],
})

export class SensorAnalysisSensorInfoComponent{
    @Input() readings: any = undefined;
    @Input() selectedSensorName: string ="";
    
    options: Object;

    constructor() {
        this.options = {
            title : { text : 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2],
            }]
        };
    }
}