import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

import { AuthenticationService } from 'src/service/authentication/authentication.service';

import { MessageService } from 'src/app/components/message/service/message.service';
import { TimeEntryService } from 'src/app/time-entries/service/time-entry.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['../../../add-edit.component.css']
})

export class AddComponent implements OnInit, OnDestroy {

  id!: number;
  
  currentDate: string = '';
  currentTime: string = '';
  greeting: string = '';
  name: string = '';
  private timer: any;
  loading = false;
  submitted = false;

  module = 'Marcar Ponto';
  breadcrumbModule: string = this.module;
  breadcrumbAction: string = 'Cadastrar';

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private timeEntryService: TimeEntryService,
    private messageService: MessageService,
    private _location: Location
  ) { }

  async ngOnInit(){
    
    this.breadcrumbAction = 'Cadastrar';

    this.name = this.getName();

    this.updateClock(); // inicia já com valor
    this.timer = setInterval(() => this.updateClock(), 1000); // atualiza a cada segundo
  }

  getName(){
    return this.authenticationService.getName();
  }

  updateClock(): void {
    const now = new Date();
    this.currentDate = now.toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    this.currentTime = now.toLocaleString('pt-PT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const hour = new Date().getHours();
    
    this.greeting = hour >= 5 && hour < 12
      ? 'Bom dia'
      : hour >= 12 && hour < 18
        ? 'Boa tarde'
        : 'Boa noite';
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  onSubmit() {
    this.loading = true;
    this.create();
  }

  private create() {
    this.timeEntryService.create()
      .pipe(first())
      .subscribe(() => {
        this.messageService.success(this.module+' cadastrado com sucesso');
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);
  }

  backClicked() {
    this._location.back();
  }
}