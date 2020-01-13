import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserSurveysPageComponent } from "./user-surveys-page.component";

describe("UserSurveysPageComponent", () => {
  let component: UserSurveysPageComponent;
  let fixture: ComponentFixture<UserSurveysPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSurveysPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSurveysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
