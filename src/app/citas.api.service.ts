import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { User } from './models/user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class CitasApiService {

    private APIURL: string = "http://54.179.145.154"; // "http://45.55.235.245"; //

    data: any;
    constructor(private http: Http) {}



    public resetPassword(key: string, password: string) {

        $("body").addClass("loading");
        let url = this.APIURL + "/reset_password?key="+key;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "new_password=" + password;

        ////console.log(body);

        return this.http.post(url, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);

    }

    public forgotPassword(username: string) {

        $("body").addClass("loading");
        let url = this.APIURL + "/forgot_password";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "username=" + username;

        ////console.log(body);

        return this.http.post(url, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);

    }

    public getSensorsFilterDownloadLink(key: string, farmID: string, siteID: string, from: Date, to: Date) {
        $("body").addClass("loading");

        //console.log(from);

        // let fromDate = from.getFullYear()+"-"+("0" + from.getMonth()).slice(-2)+"-"+("0" + from.getDate()).slice(-2);
        // let toDate = to.getFullYear()+"-"+("0" + to.getMonth()).slice(-2)+"-"+("0" + to.getDate()).slice(-2);

        let url = this.APIURL + "/download/sensor/filter?key=" + key + "&f="+ farmID+ "&d=" + siteID + "&d1=" + from + "&d2=" + to;

        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getSensorCSVDownloadLink(key: string, sensorName: string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/download/sensor/" + sensorName + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getPlantImagesDownloadLink(key: string, plantID: string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/download/image/" + plantID + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getPlantImages(key: string, plantID: string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/plantimages/" + plantID + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getPlantAnalysis(key: string, plantID: string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/plantanalysis/" + plantID + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getSites(key: string, farmID ? : string, siteID ? : string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/sites";
        if (farmID) url += "/" + farmID;
        if (siteID) url += "/" + siteID;
        url += "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getSensor(key: string, sensorName: string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/sensor/" + sensorName + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getPlant(key: string, plantID: string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/plant/" + plantID + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getSensorList(key: string, farmID ? : string, siteID ? : string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/sensorlist";
        if (farmID) url += "/" + farmID;
        if (siteID) url += "/" + siteID;
        url += "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getPlantList(key: string, farmID ? : string, siteID ? : string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/plantlist";
        if (farmID) url += "/" + farmID;
        if (siteID) url += "/" + siteID;
        url += "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getFarm(key: string, farmID: string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/farm/" + farmID + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getFarmList(key: string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/farmlist?key=" + key;
        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public contactUs(email: string, name: string, message: string) {

        $("body").addClass("loading");
        let url = this.APIURL + "/contactus";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "email=" + email +
            "&name=" + name +
            "&message=" + message;

        ////console.log(body);

        return this.http.post(url, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);

    }

    public editUser(user: User, key: string): Promise < User > {
        $("body").addClass("loading");

        let url = this.APIURL + "/profile?key=" + key;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "&fullname=" + user.fullname +
            "&mobile_number=" + user.mobile_number +
            "&email=" + user.email;

        ////console.log(body);

        return this.http.post(url, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getUser(key: string) {
        $("body").addClass("loading");
        let url = this.APIURL + "/profile?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public addUser(user: User): Promise < User > {
        $("body").addClass("loading");
        let url = this.APIURL + "/register";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "username=" + user.username +
            "&password=" + user.hashedpw +
            "&user_type=" + user.user_type +
            "&fullname=" + user.fullname +
            "&email=" + user.email +
            "&mobile_number=" + user.mobile_number;

        ////console.log(body);

        return this.http.post(url, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public authenticateUser(username: string, password: string): Promise < Response > {
        $("body").addClass("loading");

        let url = this.APIURL + "/login";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "username=" + username + "&password=" + password;

        return this.http.post(url, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        $("body").removeClass("loading");
        let body = res.json();
        return body || {};
    }


    private handleError(error: Response | any) {
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