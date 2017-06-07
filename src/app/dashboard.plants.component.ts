import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Farm } from './models/farm';

@Component({
    selector: 'plants-info',
    templateUrl: './dashboard.plants.component.html',
    styleUrls: ['./dashboard.plants.component.css']
})

export class DashboardPlantsComponent{
    @Input() plants: any[] = [];

    constructor(private router: Router){}

    public goToPlantAnalysis(){
        this.router.navigate(['/plant-analysis'])
    }
}