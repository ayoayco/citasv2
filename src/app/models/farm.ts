// usage:
// import { Farm } from './models/farm';

export class Farm {
    center: number[];
    farm_id: number;
    farm_name: string;
    farm_size: string;
    foc_present: boolean;
    foc_prevention: boolean;
    geocode: string;
    geometry: any[];
    health_summary: any;
    soil_management: boolean;

    constructor(){
        this.center = [];
        this.farm_id = undefined;
        this.farm_name = "Loading...";
        this.farm_size = "";
        this.foc_present = false;
        this.foc_prevention = false;
        this.geocode = "";
        this.geometry = [];
        this.soil_management = false;
        this.health_summary = {
            "healthy" : 0,
            "infected" : 0,
            "unknown" : 0
        }
    }

}