export class Sensor{
    farm_site_id: number;
    lat: number;
    lng: number;
    sampling_site_id: number;
    sensor_name: string;

    constructor(){
        this.farm_site_id = 0;
        this.lat = 0;
        this.lng = 0;
        this.sampling_site_id = 0;
        this.sensor_name = "";
    }
}

/*


{
    farm_site_id: 1
    lat: 6.047341
    lng: 125.0826
    sampling_site_id: 1
    sensor_name: "SN1"
} 


*/