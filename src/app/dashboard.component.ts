import { Component, OnInit } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component ({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [ AppSessionService ]
})

export class AppDashboardComponent implements OnInit {
    constructor(
        private sessionService: AppSessionService,
        private router: Router,
        private titleService: Title
    ){}
    ngOnInit() {
        let loggedIn: boolean = this.sessionService.isLoggedIn();
        if(!loggedIn){
            console.log("Please log in first.")
            this.router.navigate(['/']);
        }else{
            this.titleService.setTitle('Dashboard');
        }
    }
}