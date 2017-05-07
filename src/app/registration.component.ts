import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { User } from './user';

declare var sha256: any;

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
           mobile_nunmber: ""
        }

    constructor(
        private apiService: CitasApiService
    ){}

    addUser(): void{
        var data: any;
        this.user.hashedpw = sha256(this.user.password);
        this.apiService.addUser(this.user)
        .then(res => {
            data = res;
            if(data){
                //login success
                console.log(data.Success);
            }
        });
    }

}