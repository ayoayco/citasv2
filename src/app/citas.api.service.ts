import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {
    Http,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Request,
    Headers,
    XHRBackend
} from '@angular/http';
import { User } from './models/user';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class CitasApiService {

    private APIURL: string = "http://apiv2.citas.ph";//"http://54.179.145.154"; // "http://45.55.235.245"; //

    data: any;
    constructor(private http: Http) {}

    public getSamplingsGeoJSON(): Observable <{}>{
        $("body").addClass("loading");
        let url = "http://d3rjwxvgw19cvv.cloudfront.net/sanjose_soilchar.geojson";

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getTrainings(): Observable <{}>{
        $("body").addClass("loading");
        let url = this.APIURL + "/trainings";

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getResearch(): Observable <{}>{
        $("body").addClass("loading");
        let url = this.APIURL + "/research";

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getEvents(): Observable <{}>{
        $("body").addClass("loading");
        let url = this.APIURL + "/events";

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public resetPassword(key: string, password: string): Observable <{}> {

        $("body").addClass("loading");
        let url = this.APIURL + "/reset_password?key="+key;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "new_password=" + password;

        ////console.log(body);

        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )

    }

    public forgotPassword(username: string): Observable <{}> {

        $("body").addClass("loading");
        let url = this.APIURL + "/forgot_password";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "username=" + username;

        ////console.log(body);

        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )

    }

    public getPlantsFilterDownloadLink(key: string, farmID: string, siteID: string, health: string, from: Date, to: Date): Observable <{}>{
        $("body").addClass("loading");

        //console.log(from);

        // let fromDate = from.getFullYear()+"-"+("0" + from.getMonth()).slice(-2)+"-"+("0" + from.getDate()).slice(-2);
        // let toDate = to.getFullYear()+"-"+("0" + to.getMonth()).slice(-2)+"-"+("0" + to.getDate()).slice(-2);

        let url = this.APIURL + "/download/image/filter?key=" + key + "&f="+ farmID+ "&s=" + siteID + "&h="+ health + "&d1=" + from + "&d2=" + to;

        //console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getSensorsFilterDownloadLink(key: string, farmID: string, siteID: string, from: Date, to: Date): Observable <{}> {
        $("body").addClass("loading");

        //console.log(from);

        // let fromDate = from.getFullYear()+"-"+("0" + from.getMonth()).slice(-2)+"-"+("0" + from.getDate()).slice(-2);
        // let toDate = to.getFullYear()+"-"+("0" + to.getMonth()).slice(-2)+"-"+("0" + to.getDate()).slice(-2);

        let url = this.APIURL + "/download/sensor/filter?key=" + key + "&f="+ farmID+ "&s=" + siteID + "&d1=" + from + "&d2=" + to;

        //console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getSensorCSVDownloadLink(key: string, sensorName: string): Observable <{}> {
        $("body").addClass("loading");
        let url = this.APIURL + "/download/sensor/" + sensorName + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getPlantImagesDownloadLink(key: string, plantID: string): Observable <{}> {
        $("body").addClass("loading");
        let url = this.APIURL + "/download/image/" + plantID + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getPlantImages(key: string, plantID: string): Observable <{}> {
        $("body").addClass("loading");
        let url = this.APIURL + "/plantimages/" + plantID + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getPlantAnalysis(key: string, plantID: string): Observable <{}>  {
        $("body").addClass("loading");
        let url = this.APIURL + "/plantanalysis/" + plantID + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getSites(key: string, farmID ? : string, siteID ? : string): Observable <{}>  {
        $("body").addClass("loading");
        let url = this.APIURL + "/sites";
        if (farmID) url += "/" + farmID;
        if (siteID) url += "/" + siteID;
        url += "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getSensor(key: string, sensorName: string): Observable <{}>  {
        $("body").addClass("loading");
        let url = this.APIURL + "/sensor/" + sensorName + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getPlant(key: string, plantID: string): Observable <{}>  {
        $("body").addClass("loading");
        let url = this.APIURL + "/plant/" + plantID + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getSensorList(key: string, farmID ? : string, siteID ? : string): Observable <{}> {
        $("body").addClass("loading");
        let url = this.APIURL + "/sensorlist";
        if (farmID) url += "/" + farmID;
        if (siteID) url += "/" + siteID;
        url += "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getPlantList(key: string, farmID ? : string, siteID ? : string): Observable <{}> {
        $("body").addClass("loading");
        let url = this.APIURL + "/plantlist";
        if (farmID) url += "/" + farmID;
        if (siteID) url += "/" + siteID;
        url += "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getFarm(key: string, farmID: string): Observable <{}>  {
        $("body").addClass("loading");
        let url = this.APIURL + "/farm/" + farmID + "?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getFarmList(key: string): Observable <{}>  {
        $("body").addClass("loading");
        let url = this.APIURL + "/userfarms?key=" + key;
        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public contactUs(email: string, name: string, message: string): Observable <{}>  {

        $("body").addClass("loading");
        let url = this.APIURL + "/contactus";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "email=" + email +
            "&name=" + name +
            "&message=" + message;

        ////console.log(body);

        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )

    }

    public editUser(user: User, key: string): Observable <{}> {
        $("body").addClass("loading");

        let url = this.APIURL + "/profile?key=" + key;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "&fullname=" + user.fullname +
            "&mobile_number=" + user.mobile_number +
            "&email=" + user.email;

        ////console.log(body);

        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public getUser(key: string): Observable <{}>  {
        $("body").addClass("loading");
        let url = this.APIURL + "/profile?key=" + key;

        ////console.log(url);
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public addUser(user: User): Observable <{}>  {
        $("body").addClass("loading");
        let url = this.APIURL + "/registerv2";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "username=" + user.username +
            "&password=" + user.hashedpw +
            "&user_type=" + user.user_type +
            "&fullname=" + user.fullname +
            "&email=" + user.email +
            "&mobile_number=" + user.mobile_number+
            "&designation=" + user.details.designation+
            "&organization=" + user.details.organization+
            "&department=" + user.details.department+
            "&research_text=" + user.details.details_text+
            "&email_subscription=" + user.details.email_subscription;

            /*
            
    designation: string,
    organization: string,
    department: string,
    details_text: string,
    email_subscription: boolean
            
            */

        ////console.log(body);

        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }

    public authenticateUser(username: string, password: string): Observable <{}> {
        $("body").addClass("loading");

        let url = this.APIURL + "/login";

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let body = "username=" + username + "&password=" + password;

        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(error)
                }
            )
            .finally(
                ()=>{
                    this.onEnd();
                }
            )
    }
    
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    private onSuccess(res: Response): void {
        // console.log('Request successful');
    }
    
    private onError(res: Response): void {
        console.error('Error, status code: ' + res.status);
    }

    private onEnd(): void {
        $("body").removeClass("loading");
    }

} 