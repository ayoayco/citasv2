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
    providers: [{
        provide: HighchartsStatic,
        useFactory: highchartsFactory
    }, ],
})

export class SensorAnalysisSensorInfoComponent implements OnChanges {
    @Input() readings: any = undefined;
    @Input() selectedSensorName: string = "";

    selectedTab = '';
    options: Object;

    constructor() {
            this.selectedTab = 'soil_temp';
    }

    updateChart(tab) {
        var chartTitle = '';
        var yAxisLabel = '';
        this.selectedTab = tab;

        var links = $('ul#tablist li a.selectedTab');
        
        for(var i=0; i<links.length; i++){
            $(links[i]).removeClass('selectedTab');
        }

        $('#'+this.selectedTab).addClass('selectedTab');

        switch(this.selectedTab){
            case 'soil_temp': chartTitle = 'Soil Temperature';
                yAxisLabel = 'Temperature (°C)'; break;
            case 'air_temp': chartTitle = 'Air Temperature';
                yAxisLabel = 'Temperature (°C)'; break;
            case 'pH': chartTitle = 'pH Level'; break;
            case 'conductivity': chartTitle = 'Conductivity';break;
            case 'light': chartTitle = 'Amount of Light';break;
            case 'moisture': chartTitle = 'Soil Moisture';break;
            default: chartTitle = 'Chart'; yAxisLabel = 'Values'; break;
        }

        if (this.readings) {
            var values = [];
            var labels = [];

            for (var i = 0; i < this.readings.length; i++) {
                values.push(this.readings[i][this.selectedTab]);
                labels.push(this.readings[i].timestamp);
            }
        }

        this.options = {
            title: { text: chartTitle },
            colors: ["#19BD6C"],
            chart: {
                width: 740
            },
            series: [{
                name: this.selectedSensorName,
                data: values,
            }],
            xAxis: {
                categories: labels,
                lineWidth: 2,
                lineColor: '#ccc',
                gridLineColor: "#e6e6e6",
                gridLineDashStyle: "Solid",
                gridLineWidth: 1,
            },
            yAxis: {
                title: {
                    text: yAxisLabel
                },
                lineWidth: 2,
                lineColor: '#ccc'
            }
        };

    }

    ngOnChanges(changes: SimpleChanges) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add 'implements OnChanges' to the class.
        if (changes.readings && changes.readings.firstChange == false) {
            this.updateChart(this.selectedTab);
        }
    }
}