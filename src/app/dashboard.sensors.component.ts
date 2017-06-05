import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'sensors-info',
    templateUrl: './dashboard.sensors.component.html',
    styleUrls: ['./dashboard.sensors.component.css']
})

export class DashboardSensorsComponent {
    @Input() sensors: any[];

    constructor(private router: Router){
    }

    public goToSensorAnalysis(){
        this.router.navigate(['/sensor-analysis']);
    }
}