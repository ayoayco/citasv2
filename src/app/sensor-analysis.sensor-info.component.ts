import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

declare const require: any;
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
    @Input() selectedSensorName = '';
    @Input() type: string;

    selectedTab = '';
    options: Object;

    constructor() {
            this.selectedTab = 'soil_temp';
    }

    updateChart(tab) {
        let chartTitle = '';
        let yAxisLabel = '';
        const values = [];
        const labels = [];
        const high = [];
        const low = [];
        let up = undefined;
        let down = undefined;
        this.selectedTab = tab;
        const series = [];

        const links = $('ul#tablist li a.selectedTab');

        for (let i = 0; i < links.length; i++) {
            $(links[i]).removeClass('selectedTab');
        }

        $('#' + this.selectedTab).addClass('selectedTab');

        switch (this.selectedTab) {
            case 'soil_temp': chartTitle = 'Soil Temperature';
                yAxisLabel = 'Temperature (°C)';
                up = 35;
                down = 15;
                break;
            case 'air_temp': chartTitle = 'Air Temperature';
                yAxisLabel = 'Temperature (°C)';
                down = 8;
                break;
            case 'pH': chartTitle = 'pH Level';
                up = 7;
                down = 5;
                break;
            case 'conductivity': chartTitle = 'Conductivity';
                down = 1;
                break;
            case 'light': chartTitle = 'Amount of Light';break;
            case 'moisture': chartTitle = 'Soil Moisture';break;
            default: chartTitle = 'Chart'; yAxisLabel = 'Values'; break;
        }

        if (this.readings) {

            for (let i = 0; i < this.readings.length; i++) {
                values.push(this.readings[i][this.selectedTab]);
                if (up) {
                    high.push(up);
                }
                if (down) {
                    low.push(down);
                }
                labels.push(this.readings[i].timestamp);
            }
        }

        series.push({
                name: this.selectedSensorName+' Readings',
                data: values,
                color: '#19BD6C'
        });

        if (high.length > 0) {
            series.push({
                type: 'line',
                name: 'Critical High',
                data: high,
                color: 'red',
                animation: false,
                enableMouseTracking: false,
                dashStyle: 'dash',
                marker: {
                    enabled: false
                },
                lineWidth: 1
            });
        }

        if (low.length > 0) {
            series.push({
                type: 'line',
                name: 'Critical Low',
                data: low,
                color: 'blue',
                animation: false,
                enableMouseTracking: false,
                dashStyle: 'dash',
                marker: {
                    enabled: false
                },
                lineWidth: 1
            });
        }

        this.options = {
            title: { text: chartTitle },
            chart: {
                type: 'line'
            },
            series: series,
            xAxis: {
                categories: labels,
                lineWidth: 2,
                lineColor: '#ccc',
                gridLineColor: '#e6e6e6',
                gridLineDashStyle: 'Solid',
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
        // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        // Add 'implements OnChanges' to the class.
        if (changes.readings && changes.readings.firstChange === false) {
            this.updateChart(this.selectedTab);
        }
    }
}
