import { Component } from '@angular/core';
import { AppSessionService } from './app.session.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [
      AppSessionService
    ]
})

export class AppHomeComponent {
  title = 'Cloud-Based Intelligent Total Analysis System';
  description = 'Using Geospatial Wireless Sensors & Mobile Microscopy';

  constructor(
    private sessionService: AppSessionService,
    private router: Router
  ) {
    if (this.sessionService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
