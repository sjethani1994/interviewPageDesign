import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  canActivate() {
    let authToken = JSON.parse(sessionStorage.getItem('authToken') || '{}');
    if (authToken.token != null && authToken.token != undefined) {
      return true
    } else {
      return false
    }
  }
}
