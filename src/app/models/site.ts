export class Site {
    center: Array<number>;
    farm_site_id: number;
    geocode: string;
    geometry: Array<any>;
    sampling_site_id: number;
    sampling_site_name: string;
    sampling_site_type: string;
    status: string;

    constructor(){
        this.center = [];
        this.farm_site_id = 0;
        this.geocode = "";
        this.geometry = [];
        this.sampling_site_id = 0;
        this.sampling_site_name = "";
        this.sampling_site_type = "";
        this.status = "";
    }

}

/*

{
    center: Array(2)
    farm_site_id: 1
    geocode: null
    geometry: Array(5)
    sampling_site_id: 1
    sampling_site_name: "B2"
    sampling_site_type: "unknown"
    status: "unknown"
}

 */