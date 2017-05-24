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

    constructor(
        private apiService: CitasApiService
    ){}
    sendMessage(){
        this.apiService.contactUs(this.email, this.name, this.message)
        .then(
            res => {
                let data: any = res;
                console.log(data);
            }
        );
    }
}