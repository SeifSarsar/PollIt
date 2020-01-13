import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklySurveysPageComponent } from './weekly-surveys-page.component';

describe('WeeklySurveysPageComponent', () => {
  let component: WeeklySurveysPageComponent;
  let fixture: ComponentFixture<WeeklySurveysPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklySurveysPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklySurveysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
