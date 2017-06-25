import { Component } from '@angular/core';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

declare var require: any;
export function highchartsFactory() {
    return require('highcharts');
}

@Component({
    selector: 'plant-health',
    templateUrl: './dashboard.plant-health.component.html',
    styleUrls: ['./dashboard.plant-health.component.css'],
    providers: [{
        provide: HighchartsStatic,
        useFactory: highchartsFactory
    }, ],
})

export class DashboardPlantHealthComponent {
    options: Object;
    constructor(){

        var categories = ['Jan', 'February', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var series1 = [5, 3, 4, 7, 2, 3, 4, 7, 2, 9, 2];
        var series2 = [2, 2, 3, 2, 1, 5, 3, 4, 7, 2, 5];

        this.options = {
            chart: {
                type: 'column',
                width: '770'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: -15,
                floating: true,
                backgroundColor: 'white',
                borderColor: '#CCC',
                borderWidth: 0,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: 'white'
                    }
                }
            },
            series: [{
                name: 'Healthy',
                data: series1
            }, {
                name: 'Infected',
                data: series2
            }]
        }
    }
}

/*

Highcharts.chart('container', );


*/