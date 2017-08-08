import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Response } from '@angular/http';

import { Router } from '@angular/router'
declare let sha256: any;

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

    username: string = "";
    password: string = "";
    user = {
        username: "",
        key: ""
    };
    err: string = "";

    constructor(
        private apiService: CitasApiService,
        private sessionService: AppSessionService
    ) {}


    login(): void {
        let data: any;
        if (!this.username) {
            return;
        }

        //authenticate user
        let hash = sha256(this.password);
        let strkey = "";
        this.apiService.authenticateUser(this.username, hash)
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body)
                    // console.log(data);
                    if (data) {
                        // login success, start session 
                        // //console.log(data);
                        if (data.Success == true) {
                            $('#loginModal').modal('hide');
                            if (this.sessionService.startSession(data.user, data.key, data.fullname, data.user_type)) {
                                location.reload();
                            }
                        } else if (data.err == "Wrong username/password") {
                            this.err = "Wrong username or password.";
                            // //console.log(this.err);
                        } else {
                            this.err = "Something went wrong. Please try again.";
                            // //console.log(this.err);
                        }
                    } else {
                        // login fail
                        // //console.log("Failed to authenticate.");
                        this.err = "Something went wrong. Please try again.";
                    }
                }
                // set user.username and user.key

            );

    }
}