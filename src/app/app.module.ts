import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatListModule,
  MatInputModule,
  MatBadgeModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { MobxAngularModule } from "mobx-angular";
import { AppComponent } from "./app.component";
import { AccountComponent } from "./bank-account/account.component";

@NgModule({
  declarations: [AppComponent, AccountComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    MobxAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
