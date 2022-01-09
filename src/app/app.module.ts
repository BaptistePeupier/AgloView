import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { PasswordValidatorDirective } from './directives/password-validator.directive';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { ErrorMessageComponent } from './Common/error-message/error-message.component';
import { AnnonceurHomeComponent } from './Annonceur/annonceur-home/annonceur-home.component';
import { AnnonceurNavbarComponent } from './Annonceur/annonceur-navbar/annonceur-navbar.component';
import { AnnoncePopupComponent } from './Annonceur/annonce-popup/annonce-popup.component';
import { AnnonceurStatistiqueComponent } from './Annonceur/annonceur-statistique/annonceur-statistique.component';
import { AnnonceurAccountComponent } from './Annonceur/annonceur-account/annonceur-account.component';
import { ResetPasswordComponent } from './Common/reset-password/reset-password.component';
import { AnnonceurPasswordComponent } from './Annonceur/annonceur-account/annonceur-password/annonceur-password.component';
import { CreateAccountComponent } from './login/create-account/create-account.component';
import { DeletePopupComponent } from './Common/delete-popup/delete-popup.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { ListUsersComponent } from './Admin/admin-home/list-users/list-users.component';
import { ListAnnonceursComponent } from './Admin/admin-home/list-annonceur/list-annonceurs.component';
import { ListAdminsComponent } from './Admin/admin-home/list-admins/list-admins.component';

import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { AdminStatsComponent } from './Admin/admin-stats/admin-stats.component';
import { AdminAccountComponent } from './Admin/admin-account/admin-account.component';
import { AdminPasswordComponent } from './Admin/admin-account/admin-password/admin-password.component';
import { AdminNavbarComponent } from './Admin/admin-navbar/admin-navbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserPopupComponent } from './Admin/admin-home/list-users/user-popup/user-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    LoginComponent,
    UserHomeComponent,
    ErrorMessageComponent,
    AnnonceurHomeComponent,
    AnnonceurNavbarComponent,
    AnnoncePopupComponent,
    DeletePopupComponent,
    AnnonceurStatistiqueComponent,
    AnnonceurAccountComponent,
    ResetPasswordComponent,
    AnnonceurPasswordComponent,
    CreateAccountComponent,
    AdminHomeComponent,
    ListUsersComponent,
    ListAnnonceursComponent,
    ListAdminsComponent,
    AdminStatsComponent,
    AdminAccountComponent,
    AdminPasswordComponent,
    AdminNavbarComponent,
    UserPopupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
