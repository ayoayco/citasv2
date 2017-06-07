import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { AppSessionService } from './app.session.service';

import { Farm } from './models/farm';

@Component({
    selector: 'user-nav',
    templateUrl: './user.nav.component.html',
    styleUrls: ['./user.nav.component.css'],
    providers: [
        AppSessionService
    ]
})

export class UserNavComponent {
    @Input() farms: Farm[];
    @Input() selectedFarm: Farm = new Farm();
    @Output() selectFarm = new EventEmitter<{}>();

    isLoggedIn: boolean;
    username: string;

    constructor(
        private sessionService: AppSessionService
    ){
        this.isLoggedIn = this.sessionService.isLoggedIn();
        this.username = this.sessionService.getLoggedInUser();
    }

    public logout(){
        this.sessionService.endSession();
    }

    public OnSelectFarm(name: string){
        this.selectFarm.emit(name);
    }
}