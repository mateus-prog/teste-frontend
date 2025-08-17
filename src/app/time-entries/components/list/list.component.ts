import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/users/IUser';

import { AuthenticationService } from 'src/service/authentication/authentication.service';

import { UserService } from 'src/app/users/service/user.service';
import { TimeEntryService } from 'src/app/time-entries/service/time-entry.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../../../list.component.css']
})
export class ListComponent implements OnInit {
  paginaAtual = 1;
  title: string = '';
  filter: string = '';
  loading = false;
  loaded: boolean = false;

  administrator!: string;

  entries!: any[];
  users!: IUser[];
  filters: any = {
    user_id: '',
    date_start: '',
    date_end: '',
  }

  user_id: number = 0;
  date_start: any = '';
  date_end: any = '';

  module: string = 'Ponto Eletrônico';
  breadcrumbModule: string = this.module;
  breadcrumbAction: string = 'Listar';

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private timeEntryService: TimeEntryService,
  ) { }

  async ngOnInit(){
    this.administrator = this.getAdministrator();

    await this.userService.getAll()
      .forEach((result:any) => {
        this.users = result['data'];
        this.loaded = true;
      });
    
    await this.timeEntryService.getAll(this.filters)
      .forEach((result:any) => {
        this.entries = result['data'];
        this.loaded = true;
      });
  }

  getAdministrator(){
    return this.authenticationService.getAdministrator();
  }

  resultFilter() {
    return this.entries;
  }

  filtrar(){
    const filters = {
      user_id: this.user_id || '',
      date_start: this.date_start || '',
      date_end: this.date_end || ''
    };

    this.loading = true;
    this.timeEntryService.getAll(filters)
      .forEach((result:any) => {
        this.entries = result['data'];
        this.loaded = true;
        this.loading = false;
        this.paginaAtual = 1;
      });
  }
}