import { Injectable } from '@angular/core';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { IAuth } from 'src/app/login/LoginInterfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private sessionStorage: SessionStorageService
  ) { }

  isLoggedIn() {
      return this.sessionStorage.getItem('token')!=null && this.sessionStorage.getItem('token')!='null';
  }

  getAdministrator() {
    return this.sessionStorage.getItem('administrator');
  }

  getEmail() {
    return this.sessionStorage.getItem('email');
  }

  getName() {
    return this.sessionStorage.getItem('name');
  }

  getId() {
    return this.sessionStorage.getItem('id');
  }

  logout() {
    this.sessionStorage.removeItem('token');
    this.sessionStorage.removeItem('administrator');
    this.sessionStorage.removeItem('email');
    this.sessionStorage.removeItem('id');
    this.sessionStorage.removeItem('name');
  }

  login(data: IAuth) {
    this.sessionStorage.setItem('id', data.user.id);
    this.sessionStorage.setItem('administrator', data.user.administrator);
    this.sessionStorage.setItem('email', data.user.email);
    this.sessionStorage.setItem('token', data.token);
    this.sessionStorage.setItem('name', data.user.first_name + ' ' + data.user.last_name);
  }

  getAuthorizationHeader() {
    return {Authorization: 'Bearer ' + window.sessionStorage.getItem('token')};
  }
}
