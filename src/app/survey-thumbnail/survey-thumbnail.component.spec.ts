import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyThumbnailComponent } from './survey-thumbnail.component';

describe('SurveyThumbnailComponent', () => {
  let component: SurveyThumbnailComponent;
  let fixture: ComponentFixture<SurveyThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
