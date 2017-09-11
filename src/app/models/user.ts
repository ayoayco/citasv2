// usage:
// import { User } from './models/user';

export class User {
  username: string;
  password: string;
  hashedpw: string;
  user_type: number;
  user_type_verbose: string;
  fullname: string;
  email: string;
  mobile_number: string;
  farm_id: number;
  details: {
    designation: string,
    organization: string,
    department: string,
    details_text: string,
    email_subscription: boolean
  };

  constructor(){
    this.username = "";
    this.password = "";
    this.hashedpw = "";
    this.user_type = 0;
    this.farm_id = null;
    this.user_type_verbose = '';
    this.fullname = "";
    this.email = "";
    this.mobile_number = "";
    this.details = {
      designation: "",
      organization: "",
      department: "",
      details_text: "",
      email_subscription: false
    };
  }
}

/*

// Researcher
{
  "username": string,
  "password": string,
  "user_type": number,
  "fullname": string,
  "email": string,
  "mobile_number": string,
  "details": {
    "designation": string,
    "organization": string,
    "department": string,
    "research_text": string,
    "email_subscription": boolean,
  }
}

// Farm Owner
{
  "username": string,
  "password": string,
  "user_type": number,
  "fullname": string,
  "email": string,
  "mobile_number": string,
  "details": {
    "designation": string,
    "corporation": string,
    "email_subscription": boolean,
  }
}

// standard
{
  "username": string,
  "password": string,
  "user_type": number,
  "fullname": string,
  "email": string,
  "mobile_number": string,
  "details": {
    "designation": string,
    "organization": string,
    "department": string,
    "details_text": string,
    "email_subscription": boolean,
  }
}


*/