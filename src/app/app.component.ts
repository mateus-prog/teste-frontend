import { Component } from '@angular/core';
import { AuthenticationService } from 'src/service/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authenticationService:AuthenticationService){ }

  isAuthenticated() {
    return this.authenticationService.isLoggedIn();
  }
}
