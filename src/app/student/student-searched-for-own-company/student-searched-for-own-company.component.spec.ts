import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSearchedForOwnCompanyComponent } from './student-searched-for-own-company.component';

describe('StudentSearchedForOwnCompanyComponent', () => {
  let component: StudentSearchedForOwnCompanyComponent;
  let fixture: ComponentFixture<StudentSearchedForOwnCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSearchedForOwnCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSearchedForOwnCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
