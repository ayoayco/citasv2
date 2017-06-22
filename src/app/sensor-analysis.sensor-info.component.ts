import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

export class SensorAnalysisSensorInfoComponent implements OnChanges{
    @Input() readings: any = undefined;
    @Input() selectedSensorName: string ="";
    
    options: Object;

    constructor() {

    }

    ngOnChanges(changes: SimpleChanges) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add 'implements OnChanges' to the class.
        if(changes.readings && changes.readings.firstChange == false ){
            if(this.readings){
                console.log(this.readings);
                var air_temp = [];
                var labels = [];

                for(var i=0; i<this.readings.length; i++){
                    air_temp.push(this.readings[i].air_temp);
                    labels.push(this.readings[i].timestamp);
                }
            }

            this.options = {
                title : { text : 'Air Temperature' },
                chart: {
                    width: 800
                },
                series: [{
                    data: air_temp,
                }],
                xAxis: {
                    categories: labels
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    }
                }
            };
        }
    }
}