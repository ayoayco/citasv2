import { Component, AfterViewInit } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';

@Component({
    selector: 'register-farm',
    templateUrl: './register-farm.component.html',
    styleUrls: ['./register-farm.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class RegisterFarmComponent implements AfterViewInit {
    farm_name = '';
    farm_size = 'small';
    latlngs = [];
    farm_description = '';
    farm_location = '';
    image_file = '';
    area = 0;
    accept = false;
    err = false;
    msg = '';

    constructor(
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ) {
        const loggedIn: boolean = this.sessionService.isLoggedIn();
        if (!loggedIn) {
            this.router.navigate(['/']);
        } else {
            this.titleService.setTitle('Register New Farm');
        }
    }

    ngAfterViewInit(){
        $('map').hide();
        $('#m').hide();
        $('#addSitePrompt').hide();
    }

    public hideForm() {
        this.msg = '<strong>Registration Failed!</strong> Please correct the following error(s):<br /><ol>';
        this.err = false;
        if (this.farm_name === '') {
           this.err = true;
           this.msg += '<li> Farm Site Name is empty.</li>';
        }
        if (!this.accept) {
            this.err = true;
            this.msg += '<li> Terms not accepted.</li>';
        }
        this.msg += '</ol>';
        if (!this.err) {
            $('#content-1').hide();
            $('#addSitePrompt').hide();
            $('map').show();
            $('#m').show();
        }
    }

    public showAddSitePrompt(){
        $('map').hide();
        $('#m').hide();
        $('#addSitePrompt').show();
    }

    public showContent1() {
        $('map').hide();
        $('#m').hide();
        $('#content-1').show();
    }

    public submitFarmInfo() {
        this.err = false;
        this.msg = '';
        let data: any;
        // incomplete data, prompt fail
        if (this.latlngs.length === 0) {
            this.err = true;
            this.msg = '<strong>Error: </strong>Please draw farm boundaries.';
        } else {

            const files = $('#farm_photo-fld').prop('files');
            console.log(files);
            let _farm_id: any;

            this.apiService.addFarm(
                this.sessionService.getLoggedInKey(),
                this.farm_name,
                this.farm_size,
                this.latlngs,
                this.farm_description,
                this.farm_location)
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    _farm_id = data.farm_id;
                    if (data.Success && files.length === 0) {
                        this.sessionService.saveData('farm_id', _farm_id);
                        this.router.navigate(['/']);
                    } else if (data.Success && files.length > 0) {
                        const file = files[0];
                        console.log(file);
                        const ValidImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                        if ($.inArray(file.type, ValidImageTypes) < 0) {
                            this.err = true;
                            this.msg = 'Error: File is not an image';
                            console.error(this.msg);
                        } else if (file.size > 10485760) {
                            this.err = true;
                            this.msg = 'Error: File is too large';
                            console.error(this.msg);
                        } else {
                            this.apiService.uploadImage(this.sessionService.getLoggedInKey(), _farm_id, 'farm', file)
                            .subscribe(
                                response => {
                                    data = response;
                                    data = JSON.parse(data);
                                    console.log(data);
                                    if (data.Success) {
                                        this.sessionService.saveData('farm_id', _farm_id.toString());
                                        this.router.navigate(['/']);
                                    } else {
                                        this.err = true;
                                        this.msg = 'Error: ' + data.error_message;
                                    }
                                }
                            )
                        }
                    } else {
                        this.err = true;
                        this.msg = 'Error: ' + data.error_message;
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
