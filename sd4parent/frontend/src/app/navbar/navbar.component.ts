import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import { NgxSpinnerService } from 'ngx-spinner';
import {SessionStorageService} from 'ngx-webstorage';
import { Wallet } from '../model/wallet'
import { WalletService } from '../service/wallet.service'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public users: User[];
  public wallet: Wallet;
  private subscriptions: Subscription[] = [];
  public modalRef: BsModalRef;
  public newUser: User = new User();
  public currentUser: User = this.getSessionStorage();
  public logUser: User = new User();
  private lastId: string;

  constructor(private userService: UserService, private modalService: BsModalService, private loadingService: NgxSpinnerService, private sessionSt: SessionStorageService, private walletService: WalletService) { }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.subscriptions.push(this.userService.getUsers().subscribe(newUsers => {
      this.users = newUsers as User[];
      console.log(this.users)
      this.lastId = this.users[this.users.length-1].id;
    }))
  }

  public _closeModal(): void {
    this.modalRef.hide();
  }

  public _openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public _addUser(): void {
    this.loadingService.show();
    this.newUser.role = 'USER';
    if(this.newUser.login == null)
      this.newUser.login = this.newUser.email;
    this.newUser.id = this.lastId + 1;
    this.createWallet();
    this.subscriptions.push(this.walletService.saveWallet(this.wallet).subscribe(() => {

    }));
    this.subscriptions.push(this.userService.saveUser(this.newUser).subscribe(() => {
      console.log("New User: " + this.newUser.login);
      this.currentUser = this.newUser;
      this._updateUsers();
      this._closeModal();
      this.loadingService.hide();
    }))
  }

  public _updateUsers(): void {
    this.loadUsers();
  }

  public _findAccount(): void {
    let countLogin: number = 0;

    for (let i: number = 0; i < this.users.length; i++)
      if (this.logUser.login == this.users[i].login && this.logUser.password == this.users[i].password) {
        this.currentUser = this.users[i];
        this._closeModal();
        break;
      } else
        countLogin += 1;

      if(countLogin == this.users.length) {
        let countEmail: number = 0;
        for (let i: number = 0; i < this.users.length; i++)
          if (this.logUser.login == this.users[i].email && this.logUser.password == this.users[i].password) {
            this.currentUser = this.users[i];
            this._closeModal();
            break;
          } else
            countEmail += 1;

        if (countEmail == this.users.length)
          console.log("User hasn't been founded")
      }
  }

  public _otherLanguage(user: User): string {
    if(user == null)
      return "RUS";
    else if(user.language == "ENG")
      return "RUS";
    else
      return "ENG";
  }

  public _setSessionStorage(value: any) {
    this.sessionSt.store("logged-in", value);
  }

  private getSessionStorage(): User {
    return this.sessionSt.retrieve("logged-in");
  }

  public _delSessionStorage() {
    this.sessionSt.clear("logged-in");
  }

  private createWallet(): void {
    this.wallet = new Wallet();

    this.wallet.id = this.newUser.id;
    this.wallet.money = 0;
    this.wallet.owner = this.newUser;
  }
}
