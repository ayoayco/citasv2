import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css'],
    providers: [
        CitasApiService
    ]
})

export class AppContactUsComponent{
    email: string;
    name: string;
    message: string;
    msg: string;
    err: boolean = false;
    constructor(
        private apiService: CitasApiService
    ){}
    sendMessage(){

        this.err = false;
        this.msg = "<strong>Registration Failed!</strong> Please correct the following error(s):<br /><ol>";
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(this.email == ""){
            this.msg += "<li> Email empty</li>";
            this.err = true;
        }else if(!re.test(this.email)){
            this.msg += "<li> Email not valid</li>";
            this.err = true;
        }

        this.msg += "</ol>";

        if(!this.err){
            this.apiService.contactUs(this.email, this.name, this.message)
            .then(
                res => {
                    let data: any = res;
                    console.log(data);
                }
            );
        }
    }
}