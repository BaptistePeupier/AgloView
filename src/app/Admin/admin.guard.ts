import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  constructor(private auth: AuthenticationService,
              private router: Router) {
  }

  // Return the user's role status based on the data of AuthenticationService.
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Redirect to 'login page' is needed if guard fails.
    if (this.auth.isAuthenticated() && this.auth.isAdmin()) {
      return true;
    }
    else {
      this.auth.logout();
      this.router.navigateByUrl('').then();
      return false;
    }
  }

}
