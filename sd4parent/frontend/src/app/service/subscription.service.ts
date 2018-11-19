import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs"
import { SubscriptionPost } from "../model/subscription"

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  getSubscription(subscriptionId: string): Observable<SubscriptionPost> {
    return this.http.get<SubscriptionPost>("api/s/" + subscriptionId);
  }

  getSubscriptions(): Observable<SubscriptionPost[]> {
    return this.http.get<SubscriptionPost[]>("api/s");
  }

  saveSubscription(sub: SubscriptionPost ): Observable<SubscriptionPost> {
    return this.http.post<SubscriptionPost>("api/s", sub);
  }

  deleteSubscription(subscriptionId: string): Observable<void> {
    return this.http.delete<void>("api/s/" + subscriptionId);
  }

  getSubscriptionsByLogin(login: string): Observable<SubscriptionPost[]> {
    return this.http.get<SubscriptionPost[]>("api/s/?login=" + login);
  }
}
