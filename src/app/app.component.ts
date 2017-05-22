import { Component, OnInit } from '@angular/core';

import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['']
})

export class AppComponent implements OnInit{

  isLoggedIn: boolean;

  constructor(
    private cookieService: CookieService
  ){}

  ngOnInit(){
    var username = this.cookieService.get("username");
    var key = this.cookieService.get("key");
    
    this.isLoggedIn = username ? true : false;
    console.log("isLoggedIn: " + this.isLoggedIn);
  }

}
