import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { User } from "../model/user"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/u");
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>('/api/u', user)
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>('api/u/' + userId)
  }
}
