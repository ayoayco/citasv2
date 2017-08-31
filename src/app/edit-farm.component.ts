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
    farm_id: number;
    farm_name = '';
    farm_size = 'small';
    latlngs = [];
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
                console.log(this.farms);
            }
        );
    }

    ngAfterViewInit() {
        $('map').hide();
        $('#m').hide();
    }

    public hideForm() {
        this.msg = '<strong>Registration Failed!</strong> Please correct the following error(s):<br /><ol>';
        this.err = false;
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
        console.log('submit farm info.');
        console.log(this.farm_name);
        console.log(this.latlngs);
        let data: any;
        // incomplete data, prompt fail
        if (this.latlngs.length === 0) {
            this.err = true;
            this.msg = '<strong>Error: </strong>Please draw farm boundaries.';
        } else {
            this.apiService.addFarm(this.sessionService.getLoggedInKey(), this.farm_name, this.farm_size, this.latlngs)
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    console.log(data);
                    if (data.Success) {
                        this.sessionService.saveData('farm_id', data.farm_id);
                        this.router.navigate(['/']);
                    } else {
                        alert('The API reported an error: ' + data.error_message);
                    }
                },
                err => {
                    console.error(err);
                    alert('There was an error in communicating with the backend API.');
                }
            );
        }
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
