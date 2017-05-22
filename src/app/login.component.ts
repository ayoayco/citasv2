import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';

import { CookieService } from 'ngx-cookie';

declare var sha256: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CitasApiService, AppSessionService]
})

export class AppLoginComponent {

  username: string = "";
  password: string = "";
  user = {
    username : "",
    key : ""
  };

  constructor(
    private apiService: CitasApiService,
    private sessionService: AppSessionService,
    private cookieService: CookieService
  ) {  }


  login(): void{
    var data: any;
    if(!this.username) {
      return;
    }

    //authenticate user
    var hash = sha256(this.password);
    var strkey = "";
    this.apiService.authenticateUser(this.username, hash)
    .then(
        res => {
          data = res;
          if(data){
            // login success, start session
            if(this.sessionService.startSession(data.user, sha256(data.key))){
              this.sessionService.setLoggedIn(true, data.user);

              // set cookies!
              this.cookieService.put("key", data.key);
              this.cookieService.put("username", data.user);

              location.reload();
            }

            strkey = this.cookieService.get("key");
            console.log("key: "+ strkey);
          }else{
            // login fail
            console.log("Invalid username / password");
          }
        }
        // set user.username and user.key
    );
    
  }
}
