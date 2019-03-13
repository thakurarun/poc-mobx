import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";

import { FormControl } from "@angular/forms";
import { AccountStore } from "./account.store";
import { tap } from "rxjs/operators";
import { startObserving, stopObserving } from "../autorun.utility";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccountStore]
})
export class AccountComponent implements OnInit, OnDestroy {
  amount = new FormControl();

  public get balance(): number {
    return this.store.balance;
  }

  public get transactions(): number[] {
    return this.store.transactions;
  }

  public get validAmount(): boolean {
    return this.store.validAmount;
  }

  public get validationMessages(): string[] {
    return this.store.validationMessages;
  }

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
    startObserving(this, "watchBalance", () => this.balance);
    startObserving(this, "watchTransactions", () => this.transactions);
    startObserving(this, "watchValidAmount", () => this.validAmount);
    startObserving(
      this,
      "watchValidationMessages",
      () => this.validationMessages
    );

    this.amount.valueChanges.subscribe(value => {
      this.store.validAmount = value > 0;
    });
  }

  ngOnDestroy(): void {
    this.store.clearReactions();
    stopObserving(this);
  }

  constructor(public store: AccountStore) {}
}
