import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementDoneStudentNotPlacedComponent } from './placement-done-student-not-placed.component';

describe('PlacementDoneStudentNotPlacedComponent', () => {
  let component: PlacementDoneStudentNotPlacedComponent;
  let fixture: ComponentFixture<PlacementDoneStudentNotPlacedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementDoneStudentNotPlacedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementDoneStudentNotPlacedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
