import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOrderForCompanyComponent } from './student-order-for-company.component';

describe('StudentOrderForCompanyComponent', () => {
  let component: StudentOrderForCompanyComponent;
  let fixture: ComponentFixture<StudentOrderForCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentOrderForCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOrderForCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
