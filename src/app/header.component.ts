import { Component, Input} from '@angular/core';
import { AppSessionService } from './app.session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AppSessionService]
})

export class AppHeaderComponent {
    @Input() title: string;
    @Input() description: string;
    constructor(private sessionService: AppSessionService){
      this.sessionService.setLoggedIn(true, "yesahhhdfaj");
    }
    loggedInUser: string = this.sessionService.getLoggedInUser();
    isLoggedIn: boolean = this.sessionService.isLoggedIn();
}
