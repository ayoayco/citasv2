// usage:
// import { Farm } from './models/farm';

export class Plant {
    
    growth_stage: string;
    images: any[];
    leaf_area: number;
    leaf_count: number;
    leaves_infected: boolean;
    plant_description: string;
    plant_height: number;
    plant_id: number;
    plant_name: string;
    plant_variety: string;
    pseudostem_infected: boolean;
    qrcode: string;
    rhizom_infected: boolean;
    rhizosphere_infected: boolean;
    roots_infected: boolean;
    sampling_site_id: number;
    stem_infected: boolean;

    constructor(){
        this.growth_stage = "";
        this.images = [];
        this.leaf_area = 0;
        this.leaf_count = 0;
        this.leaves_infected = false;
        this.plant_description = "";
        this.plant_height = 0;
        this.plant_id = 0;
        this.plant_name = "";
        this.plant_variety = "";
        this.pseudostem_infected = false;
        this.qrcode = "";
        this.rhizom_infected = false;
        this.rhizosphere_infected = false;
        this.roots_infected = false;
        this.sampling_site_id = 0;
        this.stem_infected = false;
    }
}

/*

{
    growth_stage: "mature"
    images: Array(0)
    leaf_area: 0
    leaf_count: 0
    leaves_infected: false
    plant_description: "Attached"
    plant_height: 0
    plant_id: 2
    plant_name: "Palnt1"
    plant_variety: "Banana"
    pseudostem_infected: false
    qrcode: "0"
    rhizom_infected: false
    rhizosphere_infected: false
    roots_infected: false
    sampling_site_id: 2
    stem_infected: false
}

*/