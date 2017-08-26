import { debounce } from 'rxjs/operator/debounce';import { Component, OnInit } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { User } from './models/user';
import { AppSessionService } from './app.session.service';

import { Router } from '@angular/router';

declare const sha256: any;

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class AppRegistrationComponent implements OnInit {

    success = false;
    msg: string;
    err = false;
    user: User = new User();
    password2: string;
    accept: any;

    constructor(
        private apiService: CitasApiService,
        private router: Router,
        private sessionService: AppSessionService
    ) {
    }

    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.

        $('.step').hide();
        $('.step-1').show();
    }

    public addUser(): void{
        this.msg = '<strong>Registration Failed!</strong> Please correct the following error(s):<br /><ol>';
        this.err = false;
        let data: any;
        const count = 0;
        this.user.hashedpw = sha256(this.user.password);
        if (this.user.fullname === '') {
            this.msg += '<li> Fullname Empty</li>';
            this.err = true;
        }

        let re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (this.user.user_type === 5) {
            if (this.user.email === '') {
                this.msg += '<li> Email empty</li>';
                this.err = true;
            } else if (!re.test(this.user.email)) {
                this.msg += '<li> Email not valid</li>';
                this.err = true;
            }
        }

        if (this.user.user_type === 4 && this.user.mobile_number === '') {
            this.msg += '<li> Mobile Number empty</li>';
            this.err = true;
        }
        if (this.user.user_type === 4 && this.user.mobile_number.substring(0, 3) !== '639') {
            this.msg += '<li> Mobile Number should start with "639"</li>';
            this.err = true;
        }
        if (this.user.user_type === 4 && this.user.mobile_number.length < 12) {
            this.msg += '<li> Mobile Number should have 12 digits</li>';
            this.err = true;
        }
        if (this.user.user_type === 4 && this.user.details.organization === '') {
            this.msg += '<li> Corporation empty</li>';
            this.err = true;
        }
        if (this.user.user_type === 5 && this.user.details.organization === '') {
            this.msg += '<li> Organization empty</li>';
            this.err = true;
        }
        if (this.user.user_type === 5 && this.user.details.details_text === '') {
            this.msg += '<li> Reason for research empty</li>';
            this.err = true;
        }
        if (this.user.user_type === 0) {
            this.msg += '<li> User Type empty</li>';
            this.err = true;
        }
        if (this.user.password === '') {
            this.msg += '<li> Password Empty</li>';
            this.err = true;
        }
        if (!this.password2) {
            this.msg += '<li> Password Confirmation empty</li>';
            this.err = true;
        } else if (this.password2 !== this.user.password) {
            this.msg += '<li> Password Confirmation mismatch</li>';
            this.err = true;
        }
        if (!this.accept) {
            this.msg += '<li> Terms not accepted</li>';
            this.err = true;
        }


        this.msg += '</ol>';

        if (!this.err) {
            this.apiService.addUser(this.user)
            .subscribe(res => {
                data = res;
                data = JSON.parse(data._body);
                console.log(data);
                if (data) {
                    if (data.Success) {
                        this.success = true;
                    } else {
                        this.err = true;
                        this.msg = data.error_message + '. Please contact the addministrator.';
                    }
                } else {
                    this.err = true;
                    this.msg = 'Something went wrong. Please contact the addministrator.';
                }
            });
        }
    }

    public choseUserType(int: number): void {
        this.user.user_type = int;
        this.show('step-2');
    }

    public show(str: string): void {
        $('.step').hide();
        $('.' + str).show('slide');
    }

    public getUserType(): string{
        let str = '';

        switch (this.user.user_type) {
            case 4: str = 'Farm Owner'; break;
            case 5: str = 'Researcher'; break;
            default: str = 'User';
        }

        return str;
    }
}
