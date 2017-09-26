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

    private APIURL = 'http://apiv2.citas.ph';

    data: any;
    constructor(private http: Http) {}

    public getPlantGraph(key: string, farm_id: string ) {
        $('body').addClass('loading');
        const url = this.APIURL + '/plant_graph/' + farm_id + '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getWeatherStations(key: string, farm_id: string ) {
        $('body').addClass('loading');
        const url = this.APIURL + '/weather_station/' + farm_id + '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getAvailableDates(key: string, farm_id: string) {
        $('body').addClass('loading');
        const url = this.APIURL + '/download_data/' + farm_id + '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public editFarm(
        key: string,
        farm_id: number,
        farm_name: string,
        farm_size: string,
        farm_site_coordinates: number[],
        farm_description: string,
        farm_location: string
    ) {
        $('body').addClass('loading');

        const url = this.APIURL + '/farm/'+farm_id+'?key=' + key;
        const coords = JSON.stringify(farm_site_coordinates);
        const headers = new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded' 
        });
        const options = new RequestOptions({ headers: headers });

        const body = '&farm_name=' + farm_name +
            '&farm_size=' + farm_size +
            '&farm_site_coordinates=' + coords +
            '&farm_description=' + farm_description +
            '&farm_location=' + farm_location;


        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getTeamList(): Observable <{}> {
        $('body').addClass('loading');
        const url = this.APIURL + '/teamlist';

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public addSite(
        key: string,
        farm_id: string,
        site_name: string,
        site_coordinates: number[],
        infection_status: string
    ){
        $('body').addClass('loading');

        const url = this.APIURL + '/add_site?key=' + key;
        const coords = JSON.stringify(site_coordinates);
        const headers = new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded' 
        });
        const options = new RequestOptions({ headers: headers });

        const body = '&farm_id=' + farm_id +
            '&site_name=' + site_name +
            '&infection_status=' + infection_status +
            '&site_coordinates=' + coords;


        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );   
    }

    public addFarm(
        key: string,
        farm_name: string,
        farm_size: string,
        farm_site_coordinates: number[],
        farm_description: string,
        farm_location: string
    ) {
        $('body').addClass('loading');

        const url = this.APIURL + '/add_farm?key=' + key;
        const coords = JSON.stringify(farm_site_coordinates);
        const headers = new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded' 
        });
        const options = new RequestOptions({ headers: headers });

        const body = '&farm_name=' + farm_name +
            '&farm_size=' + farm_size +
            '&farm_description=' + farm_description +
            '&farm_location=' + farm_location +
            '&farm_site_coordinates=' + coords;


        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getSamplingsGeoJSON(farm_id: number): Observable <{}> {
        $('body').addClass('loading');

        let url = '';
        switch (farm_id) {
            case 4: url = 'sanjose'; break;
            case 5: url = 'admu'; break;
            case 6: url = 'liliw'; break;
            case 7: url = 'leyte'; break;
        }

        url = 'http://d3rjwxvgw19cvv.cloudfront.net/' + url + '_soilchar.geojson';

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error)
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getTrainings(): Observable <{}> {
        $('body').addClass('loading');
        const url = this.APIURL + '/trainings';

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getResearch(): Observable <{}> {
        $('body').addClass('loading');
        const url = this.APIURL + '/research';

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getEvents(): Observable <{}> {
        $('body').addClass('loading');
        const url = this.APIURL + '/events';

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            )
    }

    public resetPassword(key: string, password: string): Observable <{}> {

        $('body').addClass('loading');
        const url = this.APIURL + '/reset_password?key=' + key;

        const headers = new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const options = new RequestOptions({ headers: headers });

        const body = 'new_password=' + password;

        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );

    }

    public forgotPassword(username: string): Observable <{}> {

        $('body').addClass('loading');
        const url = this.APIURL + '/forgot_password';

        const headers = new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const options = new RequestOptions({ headers: headers });

        const body = 'username=' + username;


        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getPlantsFilterDownloadLink(
        key: string,
        farmID: string,
        siteID: string,
        health: string,
        fromDate: Date,
        toDate: Date
    ): Observable <{}> {
        $('body').addClass('loading');

        const url = this.APIURL + '/download/image/filter?key=' + key
        + '&f=' + farmID
        + '&s=' + siteID
        + '&h=' + health
        + '&d1=' + fromDate
        + '&d2=' + toDate;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getSensorsFilterDownloadLink(
        key: string, 
        farmID: string, 
        siteID: string, 
        fromDate: Date, 
        toDate: Date
    ): Observable <{}> {
        $('body').addClass('loading');

        const url = this.APIURL + '/download/sensor/filter?key=' + key 
        + '&f=' + farmID 
        + '&s=' + siteID 
        + '&d1=' + fromDate
        + '&d2=' + toDate;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getSensorCSVDownloadLink(
        key: string, 
        sensorName: string
    ): Observable <{}> {
        $('body').addClass('loading');
        const url = this.APIURL + '/download/sensor/' + sensorName + '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error)
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getPlantImagesDownloadLink(
        key: string, 
        plantID: string
    ): Observable <{}> {
        $('body').addClass('loading');
        const url = this.APIURL + '/download/image/' + plantID + '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getPlantImages(
        key: string, 
        plantID: string): Observable <{}> {
        $('body').addClass('loading');
        const url = this.APIURL + '/plantimages/' + plantID + '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error)
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            )
    }

    public getPlantAnalysis(
        key: string,
        plantID: string
    ): Observable <{}>  {
        $('body').addClass('loading');
        const url = this.APIURL + '/plantanalysis/' + plantID + '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error)
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getSites(
        key: string,
        farmID ?: string, siteID ?: string): Observable <{}>  {
        $('body').addClass('loading');
        let url = this.APIURL + '/sites';
        if (farmID) {
            url += '/' + farmID;
        }
        if (siteID) {
            url += '/' + siteID;
        }
        url += '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getSensor(key: string, sensorName: string): Observable <{}>  {
        $('body').addClass('loading');
        const url = this.APIURL + '/sensor/' + sensorName + '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getPlant(key: string, plantID: string): Observable <{}>  {
        $('body').addClass('loading');
        const url = this.APIURL + '/plant/' + plantID + '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getSensorList(
        key: string,
        farmID ?: string,
        siteID ?: string
    ): Observable <{}> {
        $('body').addClass('loading');
        let url = this.APIURL + '/sensorlist';
        if (farmID) {
            url += '/' + farmID;
        }
        if (siteID) {
            url += '/' + siteID;
        }
        url += '?key=' + key;

        return this.http.get(url)
        .catch(this.onCatch)
        .do(
            res => {
                this.onSuccess(res);
            },
            error => {
                this.onError(this, error);
            }
        )
        .finally(
            () => {
                this.onEnd();
            }
        );
    }

    public getPlantList(
        key: string,
        farmID ?: string,
        siteID ?: string
    ): Observable <{}> {
        $('body').addClass('loading');
        let url = this.APIURL + '/plantlist';
        if (farmID) {
            url += '/' + farmID;
        }
        if (siteID) {
            url += '/' + siteID;
        }
        url += '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error)
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getFarm(
        key: string,
        farmID: string
    ): Observable <{}>  {
        $('body').addClass('loading');
        const url = this.APIURL + '/farm/' + farmID + '?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getFarmList(key: string): Observable <{}>  {
        $('body').addClass('loading');
        const url = this.APIURL + '/userfarms?key=' + key;
        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public contactUs(
        email: string,
        name: string,
        message: string
    ): Observable <{}>  {

        $('body').addClass('loading');
        const url = this.APIURL + '/contactus';

        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const options = new RequestOptions({ headers: headers });

        const body = 'email=' + email +
            '&name=' + name +
            '&message=' + message;


        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public editUser(user: User, key: string): Observable <{}> {
        $('body').addClass('loading');

        const url = this.APIURL + '/profile?key=' + key;

        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const options = new RequestOptions({ headers: headers });

        const body = '&fullname=' + user.fullname +
            '&mobile_number=' + user.mobile_number +
            '&email=' + user.email +
            '&organization=' + user.details.organization +
            '&department=' + user.details.department +
            '&designation=' + user.details.designation +
            '&email_subscription=' + user.details.email_subscription +
            '&farm_id=' + user.farm_id;

        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public getUser(key: string): Observable <{}>  {
        $('body').addClass('loading');
        const url = this.APIURL + '/profile?key=' + key;

        return this.http.get(url)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public addUser(user: User): Observable <{}>  {
        $('body').addClass('loading');
        const url = this.APIURL + '/registerv2';

        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const options = new RequestOptions({ headers: headers });

        const body = 'username=' + user.username +
            '&password=' + user.hashedpw +
            '&user_type=' + user.user_type +
            '&fullname=' + user.fullname +
            '&email=' + user.email +
            '&mobile_number=' + user.mobile_number +
            '&designation=' + user.details.designation +
            '&organization=' + user.details.organization +
            '&department=' + user.details.department +
            '&research_text=' + user.details.details_text +
            '&email_subscription=' + user.details.email_subscription;


        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    public authenticateUser(username: string, password: string): Observable <{}> {
        $('body').addClass('loading');

        const url = this.APIURL + '/login';

        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const options = new RequestOptions({ headers: headers });

        const body = 'username=' + username + '&password=' + password;

        return this.http.post(url, body, options)
            .catch(this.onCatch)
            .do(
                res => {
                    this.onSuccess(res);
                },
                error => {
                    this.onError(this, error);
                }
            )
            .finally(
                () => {
                    this.onEnd();
                }
            );
    }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    private onSuccess(res: Response): void {
    }

    private onError(e, res: Response): void {
        console.error('Error, status code: ' + res.status);
        console.log(e);
    }

    private onEnd(): void {
        $('body').removeClass('loading');
    }

}
