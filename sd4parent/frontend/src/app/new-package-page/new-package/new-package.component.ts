import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.css']
})
export class NewPackageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.getUsername() == null && this.authService.getRole() != "ADMIN")
      this.router.navigate(['']);
  }

}
