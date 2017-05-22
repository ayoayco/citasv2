import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSessionService } from './app.session.service';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [''],
  providers: [
    AppSessionService
  ]
})

export class AppComponent implements OnInit{

  isLoggedIn: boolean;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private sessionService: AppSessionService
  ){}

  ngOnInit(){
    this.isLoggedIn = this.sessionService.isLoggedIn();
    console.log("isLoggedIn: " + this.isLoggedIn);

    if(this.isLoggedIn){
      this.router.navigate(['/dashboard']);
    }

  }

}
