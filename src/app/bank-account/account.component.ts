import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { computed, action, reaction, when } from "mobx";
import { FormControl } from "@angular/forms";
import { AccountState as AccountStore } from "./account.state";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccountStore]
})
export class AccountComponent implements OnInit {
  amount = new FormControl();

  deposit() {
    this.store
      .deposit(this.amount.value)
      .pipe(tap(result => result && this.resetAmount()))
      .subscribe();
  }

  withdraw() {
    this.store
      .withdraw(this.amount.value)
      .pipe(tap(result => result && this.resetAmount()))
      .subscribe();
  }

  resetAmount() {
    this.amount.setValue("");
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
      this.store.validAmount = value > 0;
    });
  }

  constructor(public store: AccountStore) {}
}
