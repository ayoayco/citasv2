import { AppSessionService } from './app.session.service';
import { CitasApiService } from './citas.api.service';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { Farm } from './models/farm'

declare var require: any;
export function highchartsFactory() {
    return require('highcharts');
}

@Component({
    selector: 'plant-health',
    templateUrl: './dashboard.plant-health.component.html',
    styleUrls: ['./dashboard.plant-health.component.css'],
    providers: [
        CitasApiService,
        AppSessionService,
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        }, ],
})

export class DashboardPlantHealthComponent implements OnChanges {
    @Input() selectedFarm: Farm = new Farm();
    options: Object;
    graphData: any[] = undefined;
    constructor(
        private apiService: CitasApiService,
        private sessionService: AppSessionService
    ){
   }

    public updateGraph(){
        if(this.graphData){
            const categories = [];
            const healthy = [];
            const infected = [];
            const unknown = [];

            for (let i = 0; i < this.graphData.length; i++) {
                categories.push(this.graphData[i].timestamp);
                healthy.push(this.graphData[i].healthy);
                infected.push(this.graphData[i].infected);
                unknown.push(this.graphData[i].unknown);
            }

            this.options = {
                chart: {
                    type: 'column',
                    height: '500px'
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
                    data: healthy,
                    color: '#33C57D'
                }, {
                    name: 'Infected',
                    data: infected,
                    color: '#FF8657'
                }, {
                    name: 'Unknown',
                    data: unknown,
                    color: '#888888'
                }]
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.selectedFarm && changes.selectedFarm.firstChange === false) {
            this.graphData = undefined;
            let data: any;
            this.apiService.getPlantGraph(this.sessionService.getLoggedInKey(), this.selectedFarm.farm_id.toString())
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    this.graphData = data.data;
                    console.log(this.graphData);
                    this.updateGraph();
                }
            );
        }
    }
}
