import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { User } from './user';

import { Router } from '@angular/router';

declare let sha256: any;

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [CitasApiService]
})

export class AppRegistrationComponent {

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
        private apiService: CitasApiService,
        private router: Router
    ){}

    addUser(): void{
        let data: any;
        this.user.hashedpw = sha256(this.user.password);
        this.apiService.addUser(this.user)
        .then(res => {
            data = res;
            if(data){
                //add success
                //console.log(data.Success);
                this.router.navigate(['/']);
            }
        });
    }

}