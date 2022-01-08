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
import {AnnonceurHomeComponent} from './Annonceur/annonceur-home/annonceur-home.component';
import {AnnonceurNavbarComponent} from './Annonceur/annonceur-navbar/annonceur-navbar.component';

import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import { AnnoncePopupComponent } from './Annonceur/annonce-popup/annonce-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeletePopupComponent } from './Common/delete-popup/delete-popup.component';
import { AnnonceurStatistiqueComponent } from './Annonceur/annonceur-statistique/annonceur-statistique.component';
import { AnnonceurAccountComponent } from './Annonceur/annonceur-account/annonceur-account.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ResetPasswordComponent } from './Common/reset-password/reset-password.component';
import { AnnonceurPasswordComponent } from './Annonceur/annonceur-account/annonceur-password/annonceur-password.component';

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
    AnnonceurPasswordComponent
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
        MatTooltipModule
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
