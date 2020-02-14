import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHomepageComponent } from './student-homepage.component';

describe('StudentHomepageComponent', () => {
  let component: StudentHomepageComponent;
  let fixture: ComponentFixture<StudentHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
