import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private httpClient: HttpClient, 
    private auth: AuthenticationService
  ) { }

  login(email: string, password: string) {
    return this.httpClient.post<any>(`${baseUrl}/login`, {email,password}).toPromise();
  }

  forgotPassword(email:string) {
    return this.httpClient.post<boolean>(`${baseUrl}/password/reset`, {email});
  }

  changePassword(password: string) {
    return this.httpClient.post(`${baseUrl}/password/change`, {password}, {
      headers: this.auth.getAuthorizationHeader()
    });
  }

}
