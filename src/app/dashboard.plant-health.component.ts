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

        var categories = ['Jan', 'Feb', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var series1 = [5, 3, 4, 7, 2, 3, 4, 7, 2, 9, 2];
        var series2 = [2, 2, 3, 2, 1, 5, 3, 4, 7, 2, 5];

        this.options = {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
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
                        enabled: false,
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