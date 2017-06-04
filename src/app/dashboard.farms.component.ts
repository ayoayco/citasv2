import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Farm } from './farm';

@Component({
    selector: 'farms-list',
    templateUrl: './dashboard.farms.component.html',
    styleUrls: ['./dashboard.farms.component.css']
})

export class DashboardFarmsComponent {
    @Input() farms: Farm[];
    @Output() selectFarm = new EventEmitter<{}>();
    
    public OnSelectFarm(name: string){
        this.selectFarm.emit(name);
    }
}