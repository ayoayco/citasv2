import { Component, Input } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Farm } from './farm';

@Component({
    selector: 'plants-info',
    templateUrl: './dashboard.plants.component.html',
    styleUrls: ['./dashboard.plants.component.css']
})

export class DashboardPlantsComponent{
    @Input() plants: any[] = [];
}