import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGotCompanyAlreadyComponent } from './student-got-company-already.component';

describe('StudentGotCompanyAlreadyComponent', () => {
  let component: StudentGotCompanyAlreadyComponent;
  let fixture: ComponentFixture<StudentGotCompanyAlreadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGotCompanyAlreadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGotCompanyAlreadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
