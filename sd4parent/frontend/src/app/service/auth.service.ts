import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from "../model/loginUser";
import { TokenStorage } from "../storage/token.storage";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private token: TokenStorage) {
  }

  attemptAuth(loginUser: LoginUser): Observable<any> {
    return this.http.post('token/generate-token', loginUser);
  }

  logout() {
    this.token.signOut();
    localStorage.clear();
  }



}
