import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/iuser';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';
import jwtDecode from 'jwt-decode';
import { localStorageKeys } from '../models/localStorageKeys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly env: string = environment.baseApi;
  userData = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  login(data: IUser): Observable<any> {
    return this.http.post<any>(this.env +'auth/login', data);
  }

  logout() {
    localStorage.removeItem(localStorageKeys.JWT);
  }

  //Token
  get currentToken(): string {
    return localStorage.getItem(localStorageKeys.JWT)!;
  }

  get isTokenAvailabe(): boolean {
    return !!localStorage.getItem(localStorageKeys.JWT);
  }

  saveUser(){
    let decodeuser = JSON.stringify(localStorage.getItem(localStorageKeys.JWT))
    this.userData.next(jwtDecode(decodeuser))
  }

}
