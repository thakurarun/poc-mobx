import { Injectable } from "@angular/core";
import {
  reaction,
  IReactionDisposer,
  autorun,
  observable,
  computed,
  action
} from "mobx";
import * as _ from "lodash";
import { Observable, of } from "rxjs";
import { startReacting } from "../autorun.utility";
@Injectable()
export class AccountStore {
  @observable validAmount: boolean = false;
  @observable transactions: number[] = [];
  @observable validationMessages: string[] = [];

  constructor() {
    this.setupReactions();
    // if (localStorage.transactions) {
    //   this.transactions = JSON.parse(localStorage.transactions);
    // }
    // autorun(() => {
    //   localStorage.setItem("transactions", JSON.stringify(this.transactions));
    // });
  }

  @computed
  get balance(): number {
    console.count("balance()");
    return _.sum(this.transactions);
  }

  @action("deposited")
  deposit(amount: number): Observable<boolean> {
    this.transactions = [...this.transactions, amount];
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
      this.validationMessages.length = 0;
    }
  }

  private reactions: IReactionDisposer[] = [];
  private setupReactions() {
    startReacting(
      this,
      () => this.transactions,
      () => this.clearValidationsIfAny(),
      { name: "clear validations if anything added to transaction" }
    );
  }

  clearReactions() {
    this.reactions.forEach(reaction => reaction());
  }
}
