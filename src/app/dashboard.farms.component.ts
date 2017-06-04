import { Component, Input } from '@angular/core';

import { Farm } from './farm';

@Component({
    selector: 'farms-list',
    templateUrl: './dashboard.farms.component.html',
    styleUrls: ['./dashboard.farms.component.css']
})

export class DashboardFarmsComponent {
    @Input() farms: Farm[];
}