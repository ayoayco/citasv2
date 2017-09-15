import { Farm } from './models/farm';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'soil-info',
    templateUrl: './soil-info.component.html',
    styleUrls: ['./soil-info.component.css']
})

export class SoilInfoComponent {
    @Input() soilChar: any = undefined;
    @Input() selectedFarm: Farm;

    constructor() {

    }

    public getBgColor(result: string){
        if (result === 'clean'){
            return '#33c57d';
        } else if (result === 'infected') {
            return '#FF8657';
        } else {
            return '#888888';
        }
    }

}
