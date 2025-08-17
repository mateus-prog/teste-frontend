import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserGuard implements CanActivate{
    
    constructor(
      private authService: AuthenticationService, 
      private router: Router
    ) { }

    canActivate(){
      if (this.authService.isLoggedIn()) {
        return true;
      }

      this.router.navigate(['login']);
      
      return false;
    }
}