import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CitasApiService } from './citas.api.service';

@Component({
    selector: 'register-farm',
    templateUrl: './register-farm.component.html',
    styleUrls: ['./register-farm.component.css'],
    providers: [
        AppSessionService,
        CitasApiService
    ]
})

export class RegisterFarmComponent{

    constructor(
        private activeRoute: ActivatedRoute,
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title,
        private apiService: CitasApiService
    ){
        let loggedIn: boolean = this.sessionService.isLoggedIn();
        if(!loggedIn){
            this.router.navigate(['/']);
        }else{
            this.titleService.setTitle('Register New Farm');
        }

    }

}