import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Response } from '@angular/http';

import { Router } from '@angular/router';
declare const sha256: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class AppLoginComponent {

    username = '';
    password = '';
    user = {
        username: '',
        key: ''
    };
    err = '';

    constructor(
        private apiService: CitasApiService,
        private sessionService: AppSessionService
    ) {}


    login(): void {
        let data: any;
        if (!this.username) {
            return;
        }

        // authenticate user
        const hash = sha256(this.password);
        const strkey = '';
        this.apiService.authenticateUser(this.username, hash)
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body)
                    if (data) {
                        // login success, start session
                        if (data.Success === true) {
                            $('#loginModal').modal('hide');
                            if (this.sessionService.startSession(
                                    data.isAdmin,
                                    data.user,
                                    data.key,
                                    data.fullname,
                                    data.user_type,
                                    data.user_type_verbose)
                                ) {
                                location.reload();
                            }
                        } else {
                            this.err = 'Error: ' + data.error_message;
                            // //console.log(this.err);
                        }
                    } else {
                        // login fail
                        // //console.log("Failed to authenticate.");
                        this.err = 'Something went wrong. Please try again.';
                    }
                },
                err => {
                    this.err = 'Something went wrong in authenticating. Please contact the administrator';
                }
            );

    }
}
