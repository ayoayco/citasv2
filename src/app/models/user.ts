// usage:
// import { User } from './models/user';

export class User {
  username: string;
  password: string;
  hashedpw: string;
  user_type: number;
  fullname: string;
  email: string;
  mobile_number: string;

  constructor(){
    this.username = "";
    this.password = "";
    this.hashedpw = "";
    this.user_type = 0;
    this.fullname = "";
    this.email = "";
    this.mobile_number = "";
  }
}