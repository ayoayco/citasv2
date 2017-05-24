import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router'
import { User } from './user';
import { CitasApiService } from './citas.api.service';

@Component(
    {
        selector: 'app-edit-profile',
        templateUrl: './edit-profile.component.html',
        styleUrls: ['./edit-profile.component.css'],
        providers: [
            CitasApiService,
            AppSessionService
        ]
    }
)

export class AppEditProfileComponent {
    
    key = this.sessionService.getLoggedInKey();
    user : User = {
           username: "",
           password: "",
           hashedpw: "",
           user_type: 0,
           firstname: "",
           lastname: "",
           email: "",
           mobile_number: ""
        }

    constructor(
        private sessionService: AppSessionService,
        private apiService: CitasApiService,
        private router: Router,
    ){
        if(!this.sessionService.isLoggedIn()){
            this.router.navigate(['/']);
        }else{
            let username = this.sessionService.getLoggedInUser();
            this.user.username = username;
            let data: any;
            // get user infor from API
            this.apiService.getUser(this.key)
            .then(res => {
                data = res;
                if(data){
                    this.user.firstname = data.firstname;
                    this.user.lastname = data.lastname;
                    this.user.mobile_number = data.mobile_number ? data.mobile_number : "";
                }
            });



        }
    }

    editUser(){
        let data: any;
        this.apiService.editUser(this.user, this.key)
        .then(res => {
                data = res;
                if(data){
                    this.user.firstname = data.firstname;
                    this.user.lastname = data.lastname;
                    this.user.mobile_number = data.mobile_number ? data.mobile_number : "";
                }
            });
    }
}