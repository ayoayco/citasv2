import { Component, Input } from '@angular/core';

import { Farm } from './models/farm';

@Component({
    selector: 'farm-info',
    templateUrl: './dashboard.farm-info.component.html',
    styleUrls: ['./dashboard.farm-info.component.css']
}
)

export class DashboardFarmInfoComponent {
    @Input() selectedFarm: Farm;
    @Input() sensors: any[];
    @Input() plants: any[];
}