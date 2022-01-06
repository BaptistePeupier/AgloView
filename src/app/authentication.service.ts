import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";

import {MessageService, ResponseData} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated = false;      // Boolean that indicate if the user is logged (so he can access the web application).
  private role = "";               // Value that indicate the type of the user.

  private userID: number;             // We store the id_user in order to perform filtering or action based on witch user is logged.
  private userName: string;           // We store the name of the user (principally to display it in the navbar).

  constructor(private msg: MessageService,
              private router: Router) {
  }

  // Initiate the login process with the backend using Message Service and the login and password gaven by the user.
  // Return an Observable on a ResponseData.
  sendAuthentication(email: string, password: string, role: string) : Observable<ResponseData> {
    const data = {
      email: email,
      password: password
    }

    // Reinitialize authentication's variables every time a user connects.
    this.authenticated = false;
    this.role = "";

    return this.msg.Create('login' + role, data);
  }

  // When the backend has returned it's response it save it (the status "logged" or not) and save the user ID.
  // Also, save the admin status of the user with the response from the backend. It may be used to give special functionalities to admins.
  // It need to be called in the login Component (view details in the README file).
  finalizeAuthentication(message: ResponseData) {
    if (message.status === 'error') {
      this.authenticated = false;
      this.role = "";
    }
    else {
      this.authenticated = true;
      this.userID = message.data._id;
      this.role = message.data.role;
    }
  }

  // Return the authentication status of the user
  isAuthenticated() : boolean {
    return this.authenticated;
  }

  isUser() : boolean {
    return (this.role === "user");
  }

  isAnnonceur() : boolean {
    return (this.role === "annonceur");
  }

  isAdmin() : boolean {
    return (this.role === "admin");
  }

  // userID's getter
  getUserID() {
    return this.userID;
  }

  // userName's getter
  getUserName() {
    return this.userName;
  }

  // userName's setter
  setUserName(newUserName: string) {
    this.userName = newUserName;
  }

  // Delete the JWT's cookie (HttpOnly so we need to do it in the backend),
  // reset the authentication's variables and return to the main page of the web application.
  logout() {
    this.msg.Create('logout', null).subscribe();
    this.authenticated = false;
    this.role = "";
    this.router.navigateByUrl('').then();
  }

}
