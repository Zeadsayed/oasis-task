import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable ({
  providedIn:"root"
})
export class AuthGuard {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    // not logged in so redirect to login page with the return url
    if (!this.auth.isTokenAvailabe) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
