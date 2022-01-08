import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import {UserHomeComponent} from './User/user-home/user-home.component';
import {UserGuard} from './User/user.guard';
import {AnnonceurGuard} from './Annonceur/annonceur.guard';
import {AnnonceurHomeComponent} from './Annonceur/annonceur-home/annonceur-home.component';
import {AnnonceurStatistiqueComponent} from './Annonceur/annonceur-statistique/annonceur-statistique.component';
import {AnnonceurAccountComponent} from './Annonceur/annonceur-account/annonceur-account.component';
import {AnnonceurPasswordComponent} from './Annonceur/annonceur-account/annonceur-password/annonceur-password.component';
import {CreateAccountComponent} from './login/create-account/create-account.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'CreateAccount', component: CreateAccountComponent },

  { path: '', canActivateChild: [UserGuard], children: [                 // All others routes are accessible only for a logged User
      {path: 'UserHome', component: UserHomeComponent}
    ]
  },

  { path: '', canActivateChild: [AnnonceurGuard], children: [                 // All others routes are accessible only for a logged User
      {path: 'AnnonceurHome', component: AnnonceurHomeComponent},
      {path: 'AnnonceurAccount', component: AnnonceurAccountComponent},
      {path: 'AnnonceurStatistics', component: AnnonceurStatistiqueComponent},
      {path: 'AnnonceurPassword', component: AnnonceurPasswordComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
