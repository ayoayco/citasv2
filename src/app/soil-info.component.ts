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
    @Input() soilcharURL: string;

    constructor() {
    }

    public getBgColor(result: string){
        if (result === 'clean'){
            return '#33C57D';
        } else if (result === 'infected') {
            return '#FF8657';
        } else {
            return '#888888';
        }
    }

}
