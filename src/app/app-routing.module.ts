import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import {UserHomeComponent} from './User/user-home/user-home.component';
import {UserGuard} from './User/user.guard';
import {AnnonceurGuard} from './Annonceur/annonceur.guard';
import {AnnonceurHomeComponent} from './Annonceur/annonceur-home/annonceur-home.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', canActivateChild: [UserGuard], children: [                 // All others routes are accessible only for a logged User
      {path: 'UserHome', component: UserHomeComponent}
    ]
  },
  { path: '', canActivateChild: [AnnonceurGuard], children: [                 // All others routes are accessible only for a logged User
      {path: 'AnnonceurHome', component: AnnonceurHomeComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
