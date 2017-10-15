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

    username = '';
    success = '';
    data: any;
    constructor(
        private apiService: CitasApiService,
    ) {}

    forgotPassword() {
        this.apiService.forgotPassword(this.username)
        .subscribe(
            res => {
                this.data = res;
                this.data = JSON.parse(this.data._body);
                // console.log(this.data);
            }
        );
    }
    public hideModal(){
        $('#forgotPasswordModal').modal('hide');
    }
}
