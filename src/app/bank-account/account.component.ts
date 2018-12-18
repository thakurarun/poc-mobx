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

  @action
  deposit(): void {
    console.log("deposited");
    let value = this.amount.value;
    this.state.transactions = [...this.state.transactions, value];
    this.resetAmount();
  }

  @action
  withdraw(): void {
    console.log("withdrawn called");
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
    this.amount.setValue(0);
    this.clearValidations();
  }

  ngOnInit() {
    // if (localStorage.accountState) {
    //   this.state = JSON.parse(localStorage.accountState) as AccountState;
    // }
    this.amount.valueChanges.subscribe(value => {
      this.state.validAmount = value > 0;
    });
  }

  constructor(protected state: AccountState) {
    window.onbeforeunload = () => {
      localStorage.accountState = JSON.stringify(this.state);
    };
    // localStorage.clear();
  }
}
