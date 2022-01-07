import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import {UserHomeComponent} from './User/user-home/user-home.component';
import {UserGuard} from './User/user.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', canActivateChild: [UserGuard], children: [                 // All others routes are accessible only of the user is logged
      {path: 'UserHome', component: UserHomeComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
