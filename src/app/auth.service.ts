import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'session_token'

  constructor() { }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token)
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey)
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey)
  }
}
