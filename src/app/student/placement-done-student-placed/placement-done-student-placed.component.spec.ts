import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementDoneStudentPlacedComponent } from './placement-done-student-placed.component';

describe('PlacementDoneStudentPlacedComponent', () => {
  let component: PlacementDoneStudentPlacedComponent;
  let fixture: ComponentFixture<PlacementDoneStudentPlacedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementDoneStudentPlacedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementDoneStudentPlacedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
