import { Injectable } from "@angular/core";
import { observable } from "mobx-angular";

@Injectable()
export class AccountState {
  @observable validAmount: boolean = false;
  @observable transactions: number[] = [];
}
