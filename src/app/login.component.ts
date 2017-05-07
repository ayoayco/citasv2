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
  ) {
    this.apiService = apiService;
  }


  login(): void{
    var data: any;
    if(!this.username) {
      return;
    }

    //authenticate user
    var hash = sha256(this.password);
    this.apiService.authenticateUser(this.username, hash)
    .then(
        res => {
          data = res;
          if(data){ // login success
            console.log("key: "+sha256(data.key));
          }else{ // login fail
            console.log("no data received");
          }
        }
        // set user.username and user.key
    );

    //start session if valid user
    
  }
}
