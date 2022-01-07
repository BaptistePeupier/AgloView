import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    LoginComponent,
    UserHomeComponent,
    ErrorMessageComponent
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
        MatIconModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
