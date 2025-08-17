import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/users/IUser';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll() {
        return this.httpClient.get<IUser[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getById(id: number) {
        return this.httpClient.get<IUser>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    create(user: IUser) {
        return this.httpClient.post<IUser>(baseUrl, user, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    update(id: number, user: IUser) {
        return this.httpClient.put<IUser>(`${baseUrl}/${id}`, user, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    resetPassword(id: number, password: string) {
        return this.httpClient.put<IUser>(`${baseUrl}/reset/${id}`, {password}, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${baseUrl}/${id}`, {
            headers: this.auth.getAuthorizationHeader()
        });
    }

    getAddressByCep(cep: string) {
        return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
    }
}
