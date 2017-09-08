import { Component, Input } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Site } from './models/site';

import { Farm } from './models/farm';

@Component({
    selector: 'farm-info',
    templateUrl: './dashboard.farm-info.component.html',
    styleUrls: ['./dashboard.farm-info.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
}
)

export class DashboardFarmInfoComponent {
    @Input() selectedFarm: Farm = new Farm();
    @Input() sensors: any[];
    @Input() plants: any[];
    @Input() sites: Site[];
    constructor(){
    }
}
