export class SensorReading{
    air_temp: number;
    battery: number;
    canopy_temp: number;
    conductivity: number;
    light: number;
    moisture: number;
    pH: number;
    soil_temp: number;
    timestamp: string;

    constructor(){
        this.air_temp = 0;
        this.battery = 0;
        this.canopy_temp = 0;
        this.conductivity = 0;
        this.light = 0;
        this.moisture = 0;
        this.pH = 0;
        this.soil_temp = 0;
        this.timestamp = "";
    }
}

/*

{
    air_temp: 29.233
    battery: 85
    canopy_temp: 1
    conductivity: 15
    light: 3
    moisture: 24
    pH: 7
    soil_temp: 28.2166
    timestamp: "2017-May-10 09:14:12"
}

*/