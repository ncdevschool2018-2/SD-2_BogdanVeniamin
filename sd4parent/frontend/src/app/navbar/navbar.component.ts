import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public users: User[];
  private subscriptions: Subscription[] = [];
  public modalRef: BsModalRef;
  public newUser: User = new User();
  public currentUser: User = null;
  public logUser: User = new User();

  constructor(private userService: UserService, private modalService: BsModalService, private loadingService: NgxSpinnerService) { }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.subscriptions.push(this.userService.getUsers().subscribe(newUsers => {
      this.users = newUsers as User[];
      console.log(this.users)
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
    this.subscriptions.push(this.userService.saveUser(this.newUser).subscribe(() => {
      this.currentUser = this.newUser;
      this._updateUsers();
      this._closeModal();
      console.log(this.users);
      console.log("Current user login, password and role: " + this.currentUser.login + " " + this.currentUser.password + " " + this.currentUser.role);
      this.loadingService.hide();
    }))
  }

  public _updateUsers(): void {
    this.loadUsers();
  }

  public _findAccount(): void {
    for (let i: number = 0; i < this.users.length; i++)
      if (this.logUser.login == this.users[i].login && this.logUser.password == this.users[i].password) {
        this.currentUser = this.users[i];
        break;
      }
    this._closeModal();
  }

  public _changeLanguage(): void {
    if(this.currentUser.language === 'ENG')
      this.currentUser.language = 'RUS';
    else
      this.currentUser.language = 'ENG';
  }

  public _otherLanguage(): string {
    if(this.currentUser === undefined)
      return 'RUS';
    if(this.currentUser.language === 'ENG')
      return 'RUS';
    else
      return 'ENG';
  }


}
