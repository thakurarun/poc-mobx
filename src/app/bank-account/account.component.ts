import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {
  amount: number = 0;
  transactions: number[] = [];
  validationMessages: string[] = [];

  public get balance(): number {
    console.log("balance check");
    return _.sum(this.transactions);
  }

  public deposit(): void {
    console.log("deposited");
    this.transactions = [...this.transactions, this.amount];
    this.resetAmount();
  }

  public withdraw(): void {
    console.log("withdrawn called");
    if (this.balance - this.amount < 0) {
      this.clearValidations();
      this.validationMessages = [
        ...this.validationMessages,
        "not suffient balance"
      ];
      return;
    }
    this.transactions = [...this.transactions, -this.amount];
    this.resetAmount();
  }

  private clearValidations() {
    this.validationMessages.length = 0;
  }

  resetAmount() {
    this.amount = 0;
    this.clearValidations();
  }

  ngOnInit() {}
  constructor() {}
}
