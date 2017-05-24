import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { User } from './user';
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

    user : User = {
           username: "",
           password: "",
           hashedpw: "",
           user_type: 0,
           fullname: "",
           email: "",
           mobile_number: ""
        }

    constructor(
        private apiService: CitasApiService,
        private router: Router,
        private sessionService: AppSessionService
    ){}

    addUser(): void{
        let data: any;
        this.user.hashedpw = sha256(this.user.password);
        let msg = "Please provide the following:\n";
        let err = false;
        if(this.user.fullname == ""){
            msg += "Fullname\n"
            err = true;
        }
        if(this.user.user_type == 5 && this.user.email == ""){
            msg += "Email\n"
            err = true;
        }
        if(this.user.user_type == 4 && this.user.mobile_number == ""){
            msg += "Mobile Number\n"
            err = true;
        }
        if(this.user.user_type == 0){
            msg += "User Type\n"
            err = true;
        }
        if(this.user.password == ""){
            msg += "Password\n"
            err = true;
        }


        
        if(err){
            alert(msg);
        }
        else{
            this.apiService.addUser(this.user)
            .then(res => {
                data = res;
                if(data){
                    //add success
                    console.log(data);
                    this.sessionService.startSession(data.username, data.key);
                    this.router.navigate(['/']);
                }
            });
        }

        
    }

}