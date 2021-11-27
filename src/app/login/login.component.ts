import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ApiService } from '../api.service'
import { AuthService } from '../auth.service'

import { RegisterResponse } from '../types/registerresponse'
import { LoginResponse } from '../types/loginresponse'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {}
  loginAlert: boolean = false
  registerGenericAlert: boolean = false
  registerPasswordAlert: boolean = false
  showLogin: boolean = true

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() { }

  switchDisplay() {
    this.model = {}
    this.loginAlert = false
    this.registerGenericAlert = false
    this.registerPasswordAlert = false
    this.showLogin = !this.showLogin
  }

  forgotPassword() {
    window.location.href = "./forgotpassword"
  }

  resetAlerts() {
    this.loginAlert = false
    this.registerGenericAlert = false
    this.registerPasswordAlert = false
  }

  onSubmitRegisterForm() {
    this.resetAlerts()

    if (this.model.password !== this.model.password2) {
      this.registerPasswordAlert = true
    } else if (this.model.email) {
      this.apiService
        .postRegister(this.model)
        .then((response: RegisterResponse) => {
          this.onSubmitLoginForm()
        }).catch((error) => {
          this.registerGenericAlert = true
        })
    } else {
      this.registerGenericAlert = true
    }
  }

  onSubmitLoginForm() {
    this.resetAlerts()

    if (this.model.email && this.model.password) {
      this.apiService
        .postLogin(this.model)
        .then((response: LoginResponse) => {
          if (response.success && response.token) {
            this.authService.setToken(response.token)
            window.location.href = "./homepage"
          } else {
            this.loginAlert = true
          }
        }).catch((error) => {
          this.loginAlert = true
        });
    } else {
      this.loginAlert = true
    }
  }

  // Observable
  // this.apiService.postLogin().subscribe((response:LoginResponse) => {
  //   do something with 'response'
  // },
  // err => {
  //   console.log(err)
  // })

}
