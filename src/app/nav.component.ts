import { Component, Input } from '@angular/core';
import { AppSessionService } from './app.session.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [
    AppSessionService
  ]
})

export class AppNavComponent {
  @Input() isTransparent: boolean;

  username: string;
  isLoggedIn: boolean;

  constructor(
    private sessionService: AppSessionService
  ){
    
    this.isLoggedIn = this.sessionService.isLoggedIn();
    this.username = this.sessionService.getLoggedInUser();
  }

  logout(){
    this.sessionService.endSession();
  }
}
