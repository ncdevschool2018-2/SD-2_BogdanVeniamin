import { Component, OnInit } from '@angular/core';
import { LoginEventService } from "../../service/login-event.service";
import { AuthService } from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.css']
})
export class NewPackageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
              private loginEventService: LoginEventService) { }

  ngOnInit() {
    this.checkUsername();
    this.loginEventService.skipClicked.subscribe( value => {
      if(value == true) {
        this.checkUsername();
      }
    })
  }

  private checkUsername(): void {
    if(this.authService.getUsername() == null)
      this.router.navigate(['']);
    else if(this.authService.getRole() != "ADMIN")
      this.router.navigate(['']);
  }

}
