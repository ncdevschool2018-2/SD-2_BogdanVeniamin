import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from "../service/auth.service";
import { Token } from "../model/token";
import { TokenStorage } from "../storage/token.storage";
import { LoginUser } from "../model/loginUser";
import {Router} from "@angular/router";
import { Decode } from "../model/decode";
import {User} from "../model/user";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: Decode;
  public newUser: User;
  public role: string;
  public loginUser: LoginUser = new LoginUser();
  private subscriptions: Subscription[] = [];
  public modalRef: BsModalRef;

  constructor(private userService: UserService, private modalService: BsModalService,
              private router: Router, private loadingService: NgxSpinnerService,
              private authService: AuthService, private tokenStorage: TokenStorage) { }

  ngOnInit() {

    if(this.tokenStorage.getToken()) {
      this.user = this.authService.decodeJwt(this.tokenStorage.getToken());
      this.role = this.user.scopes;
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public _closeModal(): void {
    this.modalRef.hide();
  }

  public _openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public authorizate(): void {
    this.loadingService.show();

    this.subscriptions.push(this.authService.attemptAuth(this.loginUser).subscribe(authToken => {
      let token: Token = authToken as Token;
      this.tokenStorage.saveToken(token.token);

      this.user = this.authService.decodeJwt(token.token);

      console.log(this.user);
      this.role = this.user.scopes;
      this.loadingService.hide();
      this._closeModal();
    }));

  }

  public signOut(): void {
    this.tokenStorage.signOut();
    this.user = undefined;
  }
}
