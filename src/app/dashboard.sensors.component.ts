import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Sensor } from './models/sensor';

@Component({
    selector: 'sensors-info',
    templateUrl: './dashboard.sensors.component.html',
    styleUrls: ['./dashboard.sensors.component.css']
})

export class DashboardSensorsComponent {
    @Input() sensors: Sensor[];

    constructor(private router: Router){
    }

    public goToSensorAnalysis(){
        this.router.navigate(['/sensor-analysis']);
    }
}