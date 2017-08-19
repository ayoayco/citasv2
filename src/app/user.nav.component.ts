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
    @Input() farms: Farm[] = [];
    @Input() selectedFarm: Farm = new Farm();
    @Output() selectFarm = new EventEmitter<{}>();
    @Output() mapResize = new EventEmitter<{}>();

    isLoggedIn: boolean;
    username: string;
    role: number;

    constructor (
        private sessionService: AppSessionService,
    ){
        this.isLoggedIn = this.sessionService.isLoggedIn();
        this.username = this.sessionService.getLoggedInUserFullname();
        this.role = this.sessionService.getLoggedInUserType();
    }

    public logout(){
        this.sessionService.endSession();
    }

    public OnSelectFarm(name: string){
        this.selectFarm.emit(name);
    }

    public toggleSidebar(){
            $('#wrapper').toggleClass('toggled');
            this.mapResize.emit();
    }
}
