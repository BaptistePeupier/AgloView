import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  isUser = true;
  isAnnonceur = false;
  isAdmin = false;

  // @ViewChild('errorMessageComponent') errorMessage;

  constructor(private route: ActivatedRoute,
              private auth : AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  // Launch the connexion process on the backend with the AuthenticationService for a User
  // If it success, then we go to the home page of the User.
  // If not, an error specified form the backend is displayed.
  // It need:
  //  + email
  //  + password
  connection() {
    let role;

    if (this.isUser) role = "User";
    if (this.isAnnonceur) role = "Annonceur";
    if (this.isAdmin) role = "Admin";

    this.auth.sendAuthentication(this.email, this.password, role).subscribe(
      res=> {
        // Once we have received response from the backend, we launch the finalization of the authentication process in
        // order to store the status of the user.
        this.auth.finalizeAuthentication(res);

        if (res.status === 'error') {
          // this.errorMessage.sendError(res.data.reason);
        }
        else {
          this.router.navigateByUrl('/' + role + 'Homepage').then();
        }
      }
    )
  }

  setRole(role: string) {
    if (role ==="user") {
      this.isUser = true;
      this.isAdmin = this.isAnnonceur = false;
    }
    if (role ==="annonceur") {
      this.isAnnonceur = true;
      this.isAdmin = this.isUser = false;
    }
    if (role ==="admin") {
      this.isAdmin = true;
      this.isUser = this.isAnnonceur = false;
    }
  }
}
