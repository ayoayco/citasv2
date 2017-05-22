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
    
    this.isLoggedIn = this.sessionService.isLoggedIn();
  }

  logout(){
    this.sessionService.endSession();
  }

  getStyle(){
    if(this.isTransparent){
      return "rgba(3, 3, 3, 0.5)";
    }
  }
}
