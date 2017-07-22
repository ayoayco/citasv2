import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
    key: string;

    constructor(
        private activeRoute: ActivatedRoute,
        private apiService: CitasApiService,
        private router: Router,
        private sessionService: AppSessionService
    ){
        this.activeRoute.params.forEach(
            (params : Params) => {
                this.key = params["id"];
            }
        );
    }

    resetPassword(): void{
        this.msg = "<strong>Registration Failed!</strong> Please correct the following error(s):<br /><ol>";
        this.err = false;
        this.success = false;


        if(this.password == ""){
            this.msg += "<li> Password Empty</li>";
            this.err = true;
        }
        if(!this.password2){
            this.msg += "<li> Password Confirmation empty</li>";
            this.err = true;
        }else if(this.password2 != this.password){
            this.msg += "<li> Password Confirmation mismatch</li>";
            this.err = true;
        }

        this.msg += "</ol>";        

        if(!this.err){
            let data: any;
            this.apiService.resetPassword(this.key, sha256(this.password))
            .subscribe(
                res => {
                    data = res;
                    data = JSON.parse(data._body);
                    if(data.Success){
                        this.success = true;
                    }
                    //console.log(data);
                }
            );
        }

    }

}