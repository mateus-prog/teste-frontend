import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'src/app/login/service/login.service';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  routeUser!: string;

  messageError: string = '';
  typePassword!: string;
  iconPassword!: string;
  
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.typePassword = 'password';
    this.iconPassword = 'fa-eye-slash';

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    this.resetState();
  
    if (this.form.invalid) return;
  
    this.loading = true;
  
    const { email, password } = this.form.value;
  
    try {
      const data = await this.loginService.login(email, password);
      this.handleLoginSuccess(data);
    } catch (error) {
      this.handleLoginError(error);
    } finally {
      this.loading = false;
    }
  }

  private resetState() {
    this.messageError = '';
    this.submitted = true;
  }

  private handleLoginSuccess(data: any) {
    this.authenticationService.login(data);
    this.routeUser = data.user.administrator == 1 ? '/user' : '/time-entry/add';
    this.router.navigate([this.routeUser]);
  }
  
  private handleLoginError(error: any) {
    console.error(error);
    this.messageError = error || 'Erro ao fazer login';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  showPassword(){
    this.iconPassword = this.typePassword === 'text' ? 'fa-eye-slash' : 'fa-eye';
    this.typePassword = this.typePassword === 'text' ? 'password' : 'text';
  }
}
