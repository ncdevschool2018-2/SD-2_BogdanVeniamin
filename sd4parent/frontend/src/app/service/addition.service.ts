import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs"
import { Addition } from "../model/addition";

@Injectable({
  providedIn: 'root'
})
export class AdditionService {

  constructor(private http: HttpClient) { }

  getAddition(additionId: string): Observable<Addition> {
    return this.http.get<Addition>("api/a/" + additionId);
  }

  getAdditions(): Observable<Addition[]> {
    return this.http.get<Addition[]>('/api/a')
  }

  saveAddition(addition: Addition): Observable<Addition> {
    return this.http.post<Addition>('/api/a', addition)
  }

  deleteAddition(additionId: string): Observable<void> {
    return this.http.delete<void>('/api/a/' + additionId)
  }
}
