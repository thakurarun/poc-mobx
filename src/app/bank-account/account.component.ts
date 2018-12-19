import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import * as _ from "lodash";
import { observable, computed, action } from "mobx";
import { FormControl } from "@angular/forms";
import { AccountState } from "./account.state";
"use strict";
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccountState]
})
export class AccountComponent implements OnInit {
  amount = new FormControl();

  validationMessages: string[] = [];

  @computed
  get balance(): number {
    console.log("balance check/update");
    return _.sum(this.state.transactions);
  }

  @action("deposited")
  deposit(): void {
    let value = this.amount.value;
    this.state.transactions = [...this.state.transactions, value];
    this.resetAmount();
  }

  @action("withdrawn")
  withdraw(): void {
    let value = this.amount.value;
    if (this.balance - value < 0) {
      this.clearValidations();
      this.validationMessages = [
        ...this.validationMessages,
        "not suffient balance"
      ];
      return;
    }
    this.state.transactions = [...this.state.transactions, -value];
    this.resetAmount();
  }

  private clearValidations() {
    this.validationMessages.length = 0;
  }

  resetAmount() {
    this.amount.setValue("");
    this.clearValidations();
  }

  ngOnInit() {
    //// enable to save state to local system
    // if (localStorage.accountState) {
    //   this.state = observable.object(JSON.parse(localStorage.accountState));
    //   localStorage.removeItem("accountState");
    // }
    // window.onbeforeunload = () => {
    //   localStorage.accountState = JSON.stringify(this.state);
    // };
    this.amount.valueChanges.subscribe(value => {
      this.state.validAmount = value > 0;
    });
  }

  constructor(public state: AccountState) {}
}
