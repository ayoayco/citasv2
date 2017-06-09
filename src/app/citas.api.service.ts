import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from './models/user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class CitasApiService {
    
    private APIURL: string = "http://45.55.235.245";

    data: any;
    constructor(private http: Http){}

    public getSites(key: string, farmID?: string, siteID?: string){
        $("body").addClass("loading");
        let url = this.APIURL + "/sites";
        if(farmID) url += "/"+farmID;
        if(siteID) url += "/"+siteID;
        url += "?key="+key;
        
        //console.log(url);
         return this.http.get(url)
         .toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }

    public getSensor(key: string, sensorName: string){
        $("body").addClass("loading");
        let url = this.APIURL + "/sensor/"+sensorName + "?key=" + key;
        
        //console.log(url);
         return this.http.get(url)
         .toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }

    public getPlant(key: string, plantID: string){
        $("body").addClass("loading");
        let url = this.APIURL + "/plant/"+plantID + "?key=" + key;
        
        //console.log(url);
         return this.http.get(url)
         .toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }

    public getSensorList(key: string, farmID?: string, siteID?: string){
        $("body").addClass("loading");
        let url = this.APIURL + "/sensorlist";
        if(farmID) url += "/"+farmID;
        if(siteID) url += "/"+siteID;
        url += "?key="+key;
        
        //console.log(url);
         return this.http.get(url)
         .toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }

    public getPlantList(key: string, farmID?: string, siteID?: string){
        $("body").addClass("loading");
        let url = this.APIURL + "/plantlist";
        if(farmID) url += "/"+farmID;
        if(siteID) url += "/"+siteID;
        url += "?key="+key;
        
        //console.log(url);
         return this.http.get(url)
         .toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }

    public getFarm(key: string, farmID: string){
        $("body").addClass("loading");
        let url = this.APIURL + "/farm/"+farmID+"?key="+key;
        
        //console.log(url);
         return this.http.get(url)
         .toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }

    public getFarmList(key: string){
        $("body").addClass("loading");
        let url = this.APIURL + "/farmlist?key="+key;
        //console.log(url);
         return this.http.get(url)
         .toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }

    public contactUs(email: string, name: string, message: string){

        let url = this.APIURL + "/contactus";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "&email="+email
            +"&name="+name
            +"&message="+message;
        
        //console.log(body);

        return this.http.post(url, body, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);

    }

    public editUser(user: User, key: string): Promise<User>{
        $("body").addClass("loading");

        let url = this.APIURL + "/profile?key="+ key;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "&fullname="+user.fullname
            +"&mobile_number="+user.mobile_number
            +"&email="+user.email;
        
        //console.log(body);

        return this.http.post(url, body, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    public getUser( key: string){
        $("body").addClass("loading");
        let url = this.APIURL + "/profile?key="+key;
        
        //console.log(url);
         return this.http.get(url)
         .toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }

    public addUser(user: User): Promise<User>{
        $("body").addClass("loading");
        let url = this.APIURL + "/register";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "username="+user.username
            +"&password="+user.hashedpw
            +"&user_type="+user.user_type
            +"&fullname="+user.fullname
            +"&email="+user.email
            +"&mobile_number="+user.mobile_number;
        
        //console.log(body);

        return this.http.post(url, body, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    public authenticateUser(username: string, password: string): Promise<Response> {
        $("body").addClass("loading");

        let url = this.APIURL + "/login";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "username="+username+"&password="+password;
        
        return this.http.post(url, body, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    private extractData(res: Response) {
        $("body").removeClass("loading");
        let body = res.json();
        return body || { };
    }

    
    private handleError (error: Response | any) {
        $("body").removeClass("loading");
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