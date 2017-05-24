import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AppSessionService{

    data: any;
    constructor(
        private cookieService: CookieService,
        private router: Router
    ){}

    public getLoggedInUser(): string{
        let user: string;

        if(this.isLoggedIn()){
            return user;
        }else{
            return;
        }
    }

    public endSession(){
        this.cookieService.removeAll();
        location.assign('/');
    }

    public startSession(username: string, key: string): void {
        
        console.log('started session for user: '+ username);

        // set cookies!
        this.cookieService.put("key", key);
        this.cookieService.put("username", username);

        this.router.navigate(['/dashboard']);
    }

    public isLoggedIn():boolean{
        return this.cookieService.get("username") ? true: false;
    }


}

