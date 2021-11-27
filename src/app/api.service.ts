import { Injectable } from '@angular/core';

import { RegisterResponse } from './types/registerresponse';
import { LoginResponse } from './types/loginresponse';
import { environment } from '../environments/environment'
import { HttpClientModule, HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private registerUrl = environment.apiHost + 'api/register'
  private loginUrl = environment.apiHost + 'api/login'
  private emailUrl = environment.apiHost + 'api/email'

  constructor(private http: HttpClient) {}

  // -- Login the user
  // postLogin(data): Promise<void | LoginResponse> {
  //   return this.http.post(this.loginUrl, data, null)
  //              .toPromise()
  //              .then(response => response as ListItem[])
  //              .catch(null); // handle error
  // }

  // postLogin(data: any): Observable<LoginResponse> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': 'my-auth-token'
  //     })
  //   };
  //
  // return this.http.post<LoginResponse>(this.loginUrl, data, httpOptions)
  //   .pipe(
  //     // console.log("error")
  //     // catchError(this.handleError('error', data))
  //   );

  public getEmail(): Promise<void | String> {
    return this.http.get(this.emailUrl)
               .toPromise()
               .then(response => response as String)
               .catch(null); // handle error
  }

  public postRegister(body: any): Promise<void | RegisterResponse> {
    return this.http.post(this.registerUrl, body)
    .toPromise()
    .then(response => response as RegisterResponse)
    .catch(null); // handle error
  }

  public postLogin(body: any): Promise<void | LoginResponse> {
    // let body = new HttpParams() // not needed when 'body' is a function parameter
    // body = body.set('client_id', env.client_id) // you can manipulate 'body' like this
    // body = body.set('client_secret', env.client_secret)
    return this.http.post(this.loginUrl, body)
    .toPromise()
    .then(response => response as LoginResponse)
    .catch(null); // handle error
  }

  // Observable
  // postSomething() {
  //   let url = ...
  //   body = body.set('client_id', env.client_id)
  //   body = body.set('client_secret', env.client_secret)
  //   return this.http.post(url, body).pipe(map((response:CustomResponseType) => {
  //     do something
  //     return response
  //   }))
  // }

}
