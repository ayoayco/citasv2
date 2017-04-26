import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})


export class AppLoginComponent {

  constructor(private loginService: LoginService) {
    this.loginService = loginService;
  }

  login(): void{
    console.log(this.loginService.login());
  }
}
