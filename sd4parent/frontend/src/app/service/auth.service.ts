import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from "../model/loginUser";
import { TokenStorage } from "../storage/token.storage";
import {Token} from "../model/token";
import { Decode } from "../model/decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private token: TokenStorage) {
  }

  attemptAuth(loginUser: LoginUser): Observable<Token> {
    return this.http.post<Token>('token/generate-token', loginUser);
  }

  decodeJwt(token: string): any {
    let encodedJwt = token.split('.')[1];
    let decodedJwt = window.atob(encodedJwt);
    return JSON.parse(decodedJwt);
  }

  getUsername(): string {
    let decodeObj: Decode = this.decodeJwt(this.token.getToken());
    return decodeObj.sub;
  }

  getRole(): string {
    let decodeObj: Decode = this.decodeJwt(this.token.getToken());
    return decodeObj.scopes;
  }

}
