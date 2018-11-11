import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/internal/Subscription"
import { Addition } from "../../model/addition";
import { AdditionService } from "../../service/addition.service";

@Component({
  selector: 'app-new-addition',
  templateUrl: './new-addition.component.html',
  styleUrls: ['./new-addition.component.css']
})
export class NewAdditionComponent implements OnInit {

  public newAddition: Addition = new Addition();
  private subscriptions: Subscription[] = [];

  constructor(private additionService: AdditionService) { }

  ngOnInit() {
  }

  public _addAddition(): void {
    this.subscriptions.push(this.additionService.saveAddition(this.newAddition).subscribe(() => {
      console.log(this.newAddition);
    }))
  }

}
