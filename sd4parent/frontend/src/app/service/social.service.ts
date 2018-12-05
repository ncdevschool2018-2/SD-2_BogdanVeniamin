import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs"
import { URLModel } from "../model/urlModel";

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http: HttpClient) { }

  createFacebookAuthorization(): Observable<URLModel> {
    return this.http.get<URLModel>("/social/createFacebookAuthorization");
  }

  getName(url: string): Observable<string> {
    return this.http.get<string>(url);
  }
}
