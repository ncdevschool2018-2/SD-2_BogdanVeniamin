import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs"
import { Wallet } from "../model/wallet"

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  getWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>("/api/w");
  }

  saveWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>("/api/w", wallet);
  }

  deleteWallet(walletId: String): Observable<void> {
   return this.http.delete<void>("api/w/" + walletId);
  }
}
