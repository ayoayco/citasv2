import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from './user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class CitasApiService {
    
    private APIURL: string = "http://45.55.235.245";

    data: any;
    constructor(private http: Http){}

    public addUser(user: User){
        var url = this.APIURL + "/register";
        var msg = "Add user: " + JSON.stringify(user);

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "username="+user.username
            +"&password="+user.hashedpw
            +"&user_type="+user.user_type
            +"&firstname="+user.firstname
            +"&lastname="+user.lastname
            +"&email="+user.email
            +"&mobile_number="+user.mobile_number;
        
        console.log(body);

        return this.http.post(url, body, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    public authenticateUser(username: string, password: string): Promise<Response> {

        var url = this.APIURL + "/login";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "username="+username+"&password="+password;
        
        return this.http.post(url, body, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
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
        console.error("Error logging in: " + errMsg);
    }

}