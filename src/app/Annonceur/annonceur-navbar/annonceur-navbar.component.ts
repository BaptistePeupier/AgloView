import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-annonceur-navbar',
  templateUrl: './annonceur-navbar.component.html',
  styleUrls: ['./annonceur-navbar.component.scss']
})
export class AnnonceurNavbarComponent implements OnInit {

  private nav = [                                     // List of links where the navBar should be displayed.
    'AnnonceurHome', 'AnnonceurStatistics',
    'AnnonceurAccount', 'AnnonceurPassword'
  ];

  displayNavBar = false;

  constructor(public router: Router,
              public auth: AuthenticationService) {
  }

  // We subscribe to the router events' in order to determine if we are in a link where the navbar should be displayed.
  // Plus, we update the current active link.
  ngOnInit(): void {
    this.router.events.subscribe(
      () => {
        // Check if we are in a link where the navbar should be displayed
        this.displayNavBar = (this.nav.indexOf(this.router.url.substring(1)) >= 0);

        if (this.displayNavBar) {
          // Update of the active link (apply style on the one and remove it on the others).
          let activeLink = document.getElementById(this.router.url.substring(1));
          let profileLinks = document.getElementById('Profile');

          // First, clear all classes 'active'
          let navLinks = document.getElementsByClassName('nav-link');
          for (let i=0; i<navLinks.length ; i++) {
            navLinks[i].classList.remove('active')
          }
          if (profileLinks !== null) {
            profileLinks.classList.remove('active');
          }

          // Then, choose the active link (the one in the navbar or the 'Profile' if it's one of its sub-link).
          if (activeLink !== null) {
            activeLink.classList.add('active');
          }
          else if (profileLinks !== null) {
            profileLinks.classList.add('active');
          }
        }
      }
    )
  }

}
