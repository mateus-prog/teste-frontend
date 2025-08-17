import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MustMatch } from 'src/app/helper/must-match.validator';

import { MessageService } from 'src/app/components/message/service/message.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  typePassword!: string;
  iconPassword!: string;
  typePasswordConfirmed!: string;
  iconPasswordConfirmed!: string;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }


  breadcrumbModule: string = 'Usuário';
  breadcrumbAction: string = 'Trocar Senha';

  ngOnInit() {

    this.typePassword = this.typePasswordConfirmed = 'password';
    this.iconPassword = this.iconPasswordConfirmed = 'fa-eye-slash';

    const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, formOptions);
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.loginService.changePassword(this.form.value.password)
        .pipe(first())
        .subscribe(() => {
          this.messageService.success('Senha alterada com sucesso!');
          this.loading = false;
        }
      );
  }

  showPassword(){
    if(this.typePassword === 'text'){
      this.iconPassword = 'fa-eye-slash';
      this.typePassword = 'password';
    }else{
      this.iconPassword = 'fa-eye';
      this.typePassword = 'text';
    }
  }

  showPasswordConfirmed(){
    if(this.typePasswordConfirmed === 'text'){
      this.iconPasswordConfirmed = 'fa-eye-slash';
      this.typePasswordConfirmed = 'password';
    }else{
      this.iconPasswordConfirmed = 'fa-eye';
      this.typePasswordConfirmed = 'text';
    }
  }
  
}