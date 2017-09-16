// usage:
// import { Farm } from './models/farm';

export class Farm {
    center: number[];
    farm_description: string;
    farm_id: number;
    farm_location: string;
    farm_name: string;
    farm_owner: string;
    farm_photo: string;
    farm_size: string;
    foc_present: boolean;
    foc_prevention: boolean;
    geocode: string;
    geometry: any[];
    health_summary: any;
    sensor_status: any;
    soil_management: boolean;

    constructor(){
        this.center = [];
        this.farm_description = "";
        this.farm_id = undefined;
        this.farm_location = "";
        this.farm_name = "Loading...";
        this.farm_photo = "";
        this.farm_owner = "";
        this.farm_size = "";
        this.foc_present = false;
        this.foc_prevention = false;
        this.geocode = "";
        this.geometry = [];
        this.sensor_status = {};
        this.soil_management = false;
        this.health_summary = {
            "healthy" : 0,
            "infected" : 0,
            "unknown" : 0
        }
    }

}