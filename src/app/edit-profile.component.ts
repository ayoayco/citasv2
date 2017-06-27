import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router'
import { User } from './models/user';
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
    
    key: string = this.sessionService.getLoggedInKey();
    success: boolean = false;
    err: boolean = false;
    msg: string;
    user : User = new User();

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
                //console.log(data);
                if(data){
                    this.user = data;
                    this.user.user_type = data.role;
                }
            });
        }
    }

    editUser(){
        let data: any;

        this.msg = "<strong>Update Failed!</strong> Please correct the following error(s):<br /><ol>";
        this.err = false;

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
        if(this.user.mobile_number.substring(0,3) != "639"){
            this.msg += "<li> Mobile Number should start with '639'</li>";
            this.err = true;
        }
        if(this.user.mobile_number.length < 12){
            this.msg += "<li> Mobile Number should have 12 digits</li>";
            this.err = true;
        }

        this.msg += "</ol>"

        if(!this.err){
            this.apiService.editUser(this.user, this.key)
            .then(res => {
                    data = res;
                    if(data){
                        this.user.fullname = data.fullname;
                        this.user.mobile_number = data.mobile_number;
                        this.user.email = data.email;
                        $('#editUserModal').modal('hide');
                    }
                });
        }
    }
}