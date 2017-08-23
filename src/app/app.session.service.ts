import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AppSessionService {
    data: any;
    constructor(
        private cookieService: CookieService,
        private router: Router
    ) {}

    public saveData(id: string, value: string): void {
        sessionStorage.setItem(id, value);
    }

    public retriveData(id: string): string {
        return sessionStorage.getItem(id);
    }

    public getLoggedInKey(): string {
        let key: string;

        if (this.isLoggedIn()) {
            return key = this.cookieService.get('key');
        } else {
            return;
        }
    }

    public getLoggedInUser(): string {
        let user: string;

        if (this.isLoggedIn()) {
            return user = this.cookieService.get('username');
        }else{
            return;
        }
    }

    public getLoggedInUserType(): number {
        let user: number;

        if (this.isLoggedIn()) {
            return user = parseInt(this.cookieService.get('user_type'), 10);
        } else {
            return;
        }
    }

    public getLoggedInUserFullname(): string {
        let user: string;

        if (this.isLoggedIn()) {
            return user = this.cookieService.get('fullname');
        } else {
            return;
        }
    }

    public endSession() {
        sessionStorage.clear();
        this.cookieService.removeAll();
        location.assign('/');
    }

    public startSession(username: string, key: string, fullname: string, user_type: number): void {
        // console.log('started session for user: '+ username);
        // console.log('key: '+ key);

        // set cookies!
        this.cookieService.put('key', key);
        this.cookieService.put('username', username);
        this.cookieService.put('user_type', user_type.toString());
        this.cookieService.put('fullname', fullname);

        this.router.navigate(['/dashboard']);
    }

    public isLoggedIn(): boolean {
        return this.cookieService.get('username') ? true : false;
    }
}
