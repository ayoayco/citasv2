import { Component, AfterViewInit } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';
import { Farm } from './models/farm';

@Component({
    selector: 'edit-farm',
    templateUrl: 'edit-farm.component.html',
    styleUrls: ['./edit-farm.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class EditFarmComponent implements AfterViewInit {
    farms: Farm[];
    selectedFarm: Farm;
    farm_id: number;
    farm_name: string;
    farm_size: string;
    farm_description = '';
    farm_location = '';
    image_file = '';
    latlngs;
    area = 0;
    accept = false;
    err = false;
    msg = '';

    constructor(
        private router: Router,
        private apiService: CitasApiService,
        private titleService: Title,
        private sessionService: AppSessionService
    ) {
        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn) {
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('Edit Farm');
        }

        this.selectedFarm = new Farm();
        let data: any;
        this.apiService.getFarmList(this.sessionService.getLoggedInKey())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.farms = data.data;
                if (this.farms.length === 0) {
                    this.router.navigate(['/']);
                }
            },
            err => {
                this.router.navigate(['/']);
            }
        );
    }

    ngAfterViewInit() {
        $('map').hide();
        $('#m').hide();
    }

    public farmChanged(){
        let data: any;
        this.apiService.getFarm(this.sessionService.getLoggedInKey(), this.farm_id.toString())
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                this.selectedFarm = data.data[0];
                this.farm_name = this.selectedFarm.farm_name;
                this.farm_size = this.selectedFarm.farm_size;
                this.farm_description = this.selectedFarm.farm_description;
                this.farm_location = this.selectedFarm.farm_location;
            }
        )
    }

    public selectFarm() {
        this.msg = '<strong>Registration Failed!</strong> Please correct the following error(s):<br /><ol>';
        this.err = false;
        if(!this.farm_id) {
            this.err = true;
            this.msg += '<li> No selected farm.</li>';
        }
        if (!this.accept) {
            this.err = true;
            this.msg += '<li> Terms not accepted.</li>';
        }
        this.msg += '</ol>';
        if (!this.err) {
                 $('#content-1').hide();
            $('map').show();
            $('#m').show();
        }
    }

    public hideMap() {
        $('map').hide();
        $('#m').hide();
        $('#content-1').show();
    }

    public submitFarmInfo() {
        this.err = false;
        this.msg = '';
        let data: any;
        if (this.latlngs === undefined) {
            // farm bounds not edited
            this.latlngs = this.selectedFarm.geometry;
        }
        this.apiService.editFarm(
            this.sessionService.getLoggedInKey(),
            this.farm_id,
            this.farm_name,
            this.farm_size,
            this.latlngs,
            this.farm_description,
            this.farm_location)
        .subscribe(
            res => {
                data = res;
                data = JSON.parse(data._body);
                if(data.Success){
                    this.router.navigate(['/']);
                }
            }
        )
    }

    public setFarmInfo(obj: any) {
        this.latlngs = obj.latlngs;
        this.area = obj.area;
        if (obj.area > 209116.15589355442) {
            this.farm_size = 'large';
        } else {
            this.farm_size = 'small';
        }
    }


}
