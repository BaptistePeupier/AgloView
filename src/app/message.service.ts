import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

// Interface that describe the format of responses from the backend
export interface ResponseData {
  status: string;
  data: any;
}

// The Message service is the way of communication with de backend.
// Each request from the frontend is conducted here, to the chosen route and the response from the backend is grabbed
// here and put in a ResponseData that will be used by the frontend.
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {
  }

  // Method that send a POST (Create) to the backend using the route and data passed.
  Create (url: string, data: any): Observable<ResponseData> {
    return this.http.post<ResponseData>(
      environment.apiHost + url,
      data,
      {withCredentials: true}
    );
  }

  // Method that send a GET (Read) to the backend using the route and data passed.
  Read (url: string, data: any): Observable<ResponseData> {
    return this.http.request<ResponseData>(
      "GET",
      environment.apiHost + url,
      {body: data, withCredentials: true}
    );
  }

  // Method that send a PUT (Update) to the backend using the route and data passed.
  Update (url: string, data: any): Observable<ResponseData> {
    return this.http.put<ResponseData>(
      environment.apiHost + url,
      data,
      {withCredentials: true}
    );
  }

  // Method that send a DELETE (Delete) to the backend using the route and data passed.
  Delete (url: string, data: any): Observable<ResponseData> {
    return this.http.request<ResponseData>(
      "GET",
      environment.apiHost + url,
      {body: data, withCredentials: true}
    );
  }
}
