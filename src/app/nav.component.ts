import { Component, Input } from '@angular/core';

import { CookieService } from 'ngx-cookie';
import { AppSessionService } from './app.session.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [AppSessionService]
})

export class AppNavComponent {
  @Input() isTransparent: boolean;

  isLoggedIn: boolean;

  constructor(
    private cookieService: CookieService,
    private sessionService: AppSessionService
  ){
    var username = this.cookieService.get("username");
    var key = this.cookieService.get("key");
    
    this.isLoggedIn = username ? true : false;
  }

  logout(){
    this.sessionService.endSession();
    location.reload();
  }

  getStyle(){
    if(this.isTransparent){
      return "rgba(3, 3, 3, 0.5)";
    }
  }
}
