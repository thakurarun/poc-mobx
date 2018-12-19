import { Injectable } from "@angular/core";
import { observable, computed, action } from "mobx-angular";
import * as _ from "lodash";
import { Observable, of } from "rxjs";
@Injectable()
export class AccountState {
  @observable validAmount: boolean = false;
  @observable transactions: number[] = [];
  @observable validationMessages: string[] = [];

  @computed
  get balance(): number {
    console.log("balance check/update");
    return _.sum(this.transactions);
  }

  @action("deposited")
  deposit(amount: number): Observable<boolean> {
    this.transactions = [...this.transactions, amount];
    this.clearValidationsIfAny();
    return of(true);
  }

  @action("withdrawn")
  withdraw(amount: number): Observable<boolean> {
    if (this.balance - amount < 0) {
      this.clearValidationsIfAny();
      this.validationMessages = [
        ...this.validationMessages,
        "not suffient balance"
      ];
      return of(false);
    }
    this.transactions = [...this.transactions, -amount];
    return of(true);
  }

  private clearValidationsIfAny() {
    if (this.validationMessages.length) {
      console.log("clear validation");
      this.validationMessages.length = 0;
    }
  }
}
