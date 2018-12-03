import { Component, OnInit } from '@angular/core';
import { AuthService } from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-addition-page',
  templateUrl: './new-addition-page.component.html',
  styleUrls: ['./new-addition-page.component.css']
})
export class NewAdditionPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.getUsername() == null && this.authService.getRole() != "ADMIN")
      this.router.navigate(['']);
  }

}
