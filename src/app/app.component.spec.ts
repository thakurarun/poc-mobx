import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AccountComponent } from "./bank-account/account.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatListModule,
  MatInputModule,
  MatBadgeModule
} from "@angular/material";
import { MobxAngularModule } from "mobx-angular";
describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
