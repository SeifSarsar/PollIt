import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesFormComponent } from './nodes-form.component';

describe('NodesFormComponent', () => {
  let component: NodesFormComponent;
  let fixture: ComponentFixture<NodesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
