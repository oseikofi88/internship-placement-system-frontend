import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHasStartedInternshipComponent } from './student-has-started-internship.component';

describe('StudentHasStartedInternshipComponent', () => {
  let component: StudentHasStartedInternshipComponent;
  let fixture: ComponentFixture<StudentHasStartedInternshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHasStartedInternshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHasStartedInternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
