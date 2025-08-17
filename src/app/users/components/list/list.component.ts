import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/service/authentication/authentication.service';
import { IUser } from 'src/app/users/IUser';
import { UserService } from 'src/app/users/service/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./../../../list.component.css']
})
export class ListComponent implements OnInit {
  paginaAtual = 1;
  title: string = '';
  filter: string = '';
  currentId: any;
  loading = false;
  loaded: boolean = false;

  idLoggin!: number;

  public resetPassword: any = '';

  users!: IUser[];

  public messageModal: string = '';
  public buttonCancel: string = '';
  public buttonConfirm: string = '';

  module: string = 'Usuário';
  breadcrumbModule: string = this.module+'s';
  breadcrumbAction: string = 'Listar';

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) { }

  async ngOnInit(){
    this.idLoggin = parseInt(this.getId());

    await this.userService.getAll()
      .forEach((result:any) => {
        this.users = result['data'];
        this.loaded = true;
      });
  }

  getId(){
    return this.authenticationService.getId();
  }

  resultFilter() {
    if (this.filter.length >= 2) {
      var resultFilter = this.users.filter((i: any) => {
        return Object.keys(i).filter(x => (typeof i[x] == 'string') ? i[x].toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 : false).length>0
      });
      
      return resultFilter;
    }

    return this.users;
  }

  async showModalResetPassword(id: any, password: string){
    this.resetPassword = '';

    await this.userService.resetPassword(id, password)
      .pipe(first())
      .subscribe(response => {
        this.resetPassword = response.password;
      });
  }

  showModalDelete(user: IUser) {
    this.currentId = user.id;

    this.buttonCancel = 'Cancelar';
    this.buttonConfirm = 'EXCLUIR';
    this.title = 'Confirma a exclusão do registro';

    this.messageModal = '';
  }

  delete(id: number) {
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }

  confirm(confirm: boolean){
    if(confirm){
      this.delete(this.currentId);
    }
  }
}