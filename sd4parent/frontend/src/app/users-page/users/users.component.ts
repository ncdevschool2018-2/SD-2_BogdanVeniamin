import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs/internal/Subscription'
import { NgxSpinnerService } from 'ngx-spinner';
import {BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[];
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private loadingService: NgxSpinnerService) { }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.loadingService.show();
    this.subscriptions.push(this.userService.getUsers().subscribe(newUsers => {
      this.users = newUsers as User[];
      console.log(this.users);
      this.loadingService.hide();
    }))
  }

  public _deleteUser(userId: string): void {
    this.subscriptions.push(this.userService.deleteUser(userId).subscribe(() => {
      this.updateUsers();
    }))
  }

  private updateUsers(): void {
    this.loadUsers();
  }

}
