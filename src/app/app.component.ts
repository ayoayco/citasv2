import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSessionService } from './app.session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['./app.component.css'],
  providers: [
    AppSessionService
  ]
})

export class AppComponent implements OnInit{

  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private sessionService: AppSessionService
  ){}

  ngOnInit(){
    this.isLoggedIn = this.sessionService.isLoggedIn();
    console.log("isLoggedIn: " + this.isLoggedIn);
  }

}
