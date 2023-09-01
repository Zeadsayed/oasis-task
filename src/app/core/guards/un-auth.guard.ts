import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})


export class UnAuthGuard{
  constructor(private auth: AuthService, private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.auth.isTokenAvailabe) return true;
    this.router.navigate(["/"]);
    return false;
  }
}
