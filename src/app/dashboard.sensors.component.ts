import { Component, Input } from '@angular/core';

@Component({
    selector: 'sensors-info',
    templateUrl: './dashboard.sensors.component.html',
    styleUrls: ['./dashboard.sensors.component.css']
})

export class DashboardSensorsComponent {
    @Input() sensors: any[];
}