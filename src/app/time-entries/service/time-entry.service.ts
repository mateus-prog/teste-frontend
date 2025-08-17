import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ITimeEntry } from 'src/app/time-entries/ITimeEntry';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

const baseUrl = `${environment.API_PATH}/time-entry`;

@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {

    constructor(
        private httpClient: HttpClient,
        private auth: AuthenticationService
    ) { }

    getAll(filters: any = {}) {
        return this.httpClient.get<ITimeEntry[]>(baseUrl, {
            headers: this.auth.getAuthorizationHeader(),
            params: filters
        });
    }

    create() {
        return this.httpClient.post(baseUrl, {}, {
            headers: this.auth.getAuthorizationHeader()
        });
    }
}
