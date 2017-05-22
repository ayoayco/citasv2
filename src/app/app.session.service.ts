import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class AppSessionService{

    private APIURL = 'http://localhost:3000';
    private loggedIn: boolean = false;
    private loggedInUser: string = "";

    data: any;
    constructor(
        private http: Http,
        private cookieService: CookieService,
        private router: Router
    ){}

    public getLoggedInUser(): string{
        return this.loggedInUser;
    }

    public endSession(){
        this.cookieService.removeAll();
        this.router.navigate(['/']);
    }

    public startSession(username: string, key: string): Promise<Response> {
        var url = this.APIURL + "/api/login";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "username="+username+"&key="+key;
        
        return this.http.post(url, body, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log('started session for user: '+ body.username);
        return body || { };
    }

    
    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error("Error starting session: " + errMsg);
    }


    public isLoggedIn():boolean{
        return this.loggedIn;
    }

    public setLoggedIn(isLoggedIn: boolean, username: string): void{
        this.loggedIn = isLoggedIn;
        this.loggedInUser = username;
    }


}

