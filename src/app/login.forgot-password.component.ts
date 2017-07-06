import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './login.forgot-password.component.html',
    styleUrls: ['./login.forgot-password.component.css'],
    providers: [
        CitasApiService
    ]
})

export class AppLoginForgotPasswordComponent {

    username: string = "";
    success: string="";
    data: any;
    constructor(
        private apiService: CitasApiService,
    ) {}

    forgotPassword() {
        this.apiService.forgotPassword(this.username)
        .then(
            res => {
                this.data = res;
                console.log(this.data);
            }
        )
    }
}