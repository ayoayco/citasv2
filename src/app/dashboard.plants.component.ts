import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Farm } from './models/farm';

@Component({
    selector: 'plants-info',
    templateUrl: './dashboard.plants.component.html',
    styleUrls: ['./dashboard.plants.component.css']
})

export class DashboardPlantsComponent implements OnChanges {
    @Input() selectedFarm: Farm;
    total: number;
    healthy: number;
    infected: number;
    unknown: number;
    constructor(
    ) {
        this.total = 0;
        this.healthy = 0;
        this.infected = 0;
        this.unknown = 0;
    }

    ngOnChanges(changes: SimpleChanges) {
        // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        // Add 'implements OnChanges' to the class.
        if (changes.selectedFarm  && changes.selectedFarm.firstChange === false ) {
            if (this.selectedFarm.health_summary) {
                this.total = this.selectedFarm.health_summary.healthy
                    + this.selectedFarm.health_summary.infected
                    + this.selectedFarm.health_summary.unknown;
                this.healthy = this.selectedFarm.health_summary.healthy;
                this.infected = this.selectedFarm.health_summary.infected;
                this.unknown =  this.selectedFarm.health_summary.unknown;
            }
        }

    }
}