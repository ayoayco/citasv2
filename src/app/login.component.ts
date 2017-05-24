import { Component } from '@angular/core';
import { CitasApiService } from './citas.api.service';
import { AppSessionService } from './app.session.service';

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
    private sessionService: AppSessionService
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
              location.reload();
            }
          }else{
            // login fail
            console.log("Invalid username / password");
          }
        }
        // set user.username and user.key
    );
    
  }
}
