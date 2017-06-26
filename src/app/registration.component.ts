import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { User } from './models/user';
import { AppSessionService } from './app.session.service';

import { Router } from '@angular/router';

declare let sha256: any;

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [
        CitasApiService,
        AppSessionService
    ]
})

export class AppRegistrationComponent {

    success: boolean = false;
    msg: string;
    err: boolean = false;
    user : User = new User();
    password2: string;
    accept:any;

    constructor(
        private apiService: CitasApiService,
        private router: Router,
        private sessionService: AppSessionService
    ){}

    addUser(): void{
        this.msg = "<strong>Registration Failed!</strong> Please correct the following error(s):<br /><ol>";
        this.err = false;
        let data: any;
        let count: number = 0;
        this.user.hashedpw = sha256(this.user.password);
        if(this.user.fullname == ""){
            this.msg += "<li> Fullname Empty</li>";
            this.err = true;
        }
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.user.user_type == 5){
            if(this.user.email == ""){
                this.msg += "<li> Email empty</li>";
                this.err = true;
            }else if(!re.test(this.user.email)){
                this.msg += "<li> Email not valid</li>";
                this.err = true;
            }
        }
        if(this.user.user_type == 4 && this.user.mobile_number == ""){
            this.msg += "<li> Mobile Number empty</li>";
            this.err = true;
        }
        console.log("#: "+this.user.mobile_number.substring(0,3));
        if(this.user.mobile_number.substring(0,3) != "639"){
            this.msg += "<li> Mobile Number should start with '639'</li>";
            this.err = true;
        }
        if(this.user.user_type == 0){
            this.msg += "<li> User Type empty</li>";
            this.err = true;
        }
        if(this.user.password == ""){
            this.msg += "<li> Password Empty</li>";
            this.err = true;
        }
        if(!this.password2){
            this.msg += "<li> Password Confirmation empty</li>";
            this.err = true;
        }else if(this.password2 != this.user.password){
            this.msg += "<li> Password Confirmation mismatch</li>";
            this.err = true;
        }
        if(!this.accept){
            this.msg += "<li> Terms not accepted</li>";
            this.err = true;
        }


        this.msg += "</ol>"

        
        if(!this.err){
            this.success = true;
            this.apiService.addUser(this.user)
            .then(res => {
                data = res;
                if(data){
                    //add success
                    // login success, start session
                    console.log(data);
                    if(this.sessionService.startSession(data.user, data.key)){
                        this.router.navigate(['/']);
                    }

                    this.router.navigate(['/']);
                    //prompt user to check email
                }else{
                    // login fail
                    console.log("Failed to authenticate.");
                }
            });
        }

        
    }

}