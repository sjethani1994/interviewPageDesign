import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { map } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions: { headers: HttpHeaders } | undefined;
  loaderStatus: any;
  authToken: any = {};

  key: any;
  iv: any;

  handleFormStatusValueOnBackButton: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.key = CryptoJS.enc.Utf8.parse(environment.encryption_key);
    this.iv = CryptoJS.enc.Utf8.parse(environment.encryption_key);
    this.handleFormStatusValueOnBackButton = new BehaviorSubject({
      flag: false,
    });
  }

  UpdateHttpRequest() {
    this.authToken = JSON.parse(sessionStorage.getItem('authToken') || '{}');
    let sessionId = sessionStorage.getItem('X-Session-Id') || '';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;',
        'X-Frame-Options': 'SAMEORIGIN',
        'Access-Control-Allow-Origin': '*',
        'X-Session-Id': sessionId,
        Authorization: 'Bearer ' + this.authToken.token,
      }),
    };
  }

  getUserList(): Observable<any> {
    this.UpdateHttpRequest();
    return this.http.get('https://dummyapi.io/data/v1/user?limit=10', {
      headers: {
        'app-id': '639054ce78f79024b6af9757',
      },
    });
  }
}
