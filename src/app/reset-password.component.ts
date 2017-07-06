import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';

import { Router } from '@angular/router';

declare let sha256: any;

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class AppResetPasswordComponent{

    data: any;
    password: string;
    password2: string;
    msg: string;
    err: boolean;
    success: boolean;

    constructor(
        private apiService: CitasApiService,
        private router: Router,
        private sessionService: AppSessionService
    ){}

    resetPassword(): void{
        this.msg = "<strong>Registration Failed!</strong> Please correct the following error(s):<br /><ol>";
        this.err = false;
        this.success = false;
    }

}