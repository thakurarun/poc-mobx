import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import * as _ from "lodash";
import { observable, computed } from "mobx";
import { FormControl } from "@angular/forms";
import { debounce, tap } from "rxjs/operators";
import { Observable } from "rxjs";
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {
  amount = new FormControl();
  amount$: Observable<number>;

  @observable
  transactions: number[] = [];

  validationMessages: string[] = [];

  @computed
  get balance(): number {
    console.log("balance check");
    return _.sum(this.transactions);
  }

  @computed
  get validAmount(): boolean {
    return this.amount.value < 1;
  }

  deposit(): void {
    console.log("deposited");
    let value = this.amount.value;
    this.transactions = [...this.transactions, value];
    this.resetAmount();
  }

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
    this.transactions = [...this.transactions, -value];
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
    this.amount$ = this.amount.valueChanges.pipe(
      tap(() => {
        debugger;
        this.validAmount;
      })
    );
  }
  constructor() {}
}
