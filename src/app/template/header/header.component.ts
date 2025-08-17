import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  administrator!: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  async ngOnInit(){
    this.administrator = this.getAdministrator();
  }

  getAdministrator(){
    return this.authenticationService.getAdministrator();
  }

  logoff() {
    this.authenticationService.logout();
    this.router.navigate(['/login'])
  }

}
