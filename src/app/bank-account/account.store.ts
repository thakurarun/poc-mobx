import { Injectable } from "@angular/core";
import { when, reaction, IReactionDisposer } from "mobx";
import { observable, computed, action } from "mobx-angular";
import * as _ from "lodash";
import { Observable, of } from "rxjs";
@Injectable()
export class AccountStore {
  @observable validAmount: boolean = false;
  @observable transactions: number[] = [];
  @observable validationMessages: string[] = [];

  @computed
  get balance(): number {
    console.log("balance check");
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

  constructor() {
    this.setupReactions();
  }

  private clearValidationsIfAny() {
    if (this.validationMessages.length) {
      this.validationMessages.length = 0;
    }
  }

  private reactions: IReactionDisposer[] = [];
  private setupReactions() {
    let clearValidationReaction = reaction(
      () => this.transactions,
      () => {
        console.log("changes to transactions");
        this.clearValidationsIfAny();
      },
      { name: "clear validations if anything added to transaction" }
    );
    this.reactions.push(clearValidationReaction);
  }

  clearReactions() {
    console.log("clear reactions");
    this.reactions.forEach(reaction => reaction());
  }
}
