import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AccountComponent } from "./account.component";
import { AppModule } from "../app.module";
import { By } from "@angular/platform-browser";
describe("AccountComponent", () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create account application", () => {
    expect(component).toBeTruthy();
  });

  it("should deposit money", () => {
    component.amount.setValue(10);
    component.deposit();
    expect(component.store.balance).toBe(10);
  });

  it("should withdraw money", () => {
    component.amount.setValue(10);
    component.deposit();
    component.amount.setValue(6);
    component.withdraw();
    expect(component.store.balance).toBe(4);
  });

  it("should throw exception for not sufficient balance", () => {
    component.amount.setValue(10);
    component.deposit();
    component.amount.setValue(15);
    component.withdraw();
    expect(component.store.validationMessages.length).toBe(1);
  });

  it("should clear amount after deposit", () => {
    component.amount.setValue(5);
    component.deposit();
    expect(component.amount.value).toBe("");
  });

  it("should reset amount", () => {
    component.amount.setValue(5);
    component.resetAmount();
    expect(component.amount.value).toBe("");
  });

  it("should disable action buttons", () => {
    component.amount.setValue(5);
    let btn = fixture.debugElement.query(By.css("#deposit-btn")).nativeElement;
    expect(btn.disabled).toBe(false);
  });
});
