import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/internal/Subscription"
import { Addition } from "../../model/addition";
import { AdditionService } from "../../service/addition.service";
import { LoginEventService } from "../../service/login-event.service";
import { AuthService } from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-addition',
  templateUrl: './new-addition.component.html',
  styleUrls: ['./new-addition.component.css']
})
export class NewAdditionComponent implements OnInit {

  public newAddition: Addition = new Addition();
  private subscriptions: Subscription[] = [];

  constructor(private additionService: AdditionService, private loginEventService: LoginEventService,
              private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkUsername();
    this.loginEventService.skipClicked.subscribe( value => {
      if(value == true) {
        this.checkUsername();
      }
    })
  }

  public _addAddition(): void {
    this.subscriptions.push(this.additionService.saveAddition(this.newAddition).subscribe(() => {
      console.log(this.newAddition);
    }))
  }

  private checkUsername(): void {
    if(this.authService.getUsername() == null)
      this.router.navigate(['']);
    else if(this.authService.getRole() != "ADMIN")
      this.router.navigate(['']);
  }

}
