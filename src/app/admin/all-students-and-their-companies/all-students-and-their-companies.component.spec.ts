import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStudentsAndTheirCompaniesComponent } from './all-students-and-their-companies.component';

describe('AllStudentsAndTheirCompaniesComponent', () => {
  let component: AllStudentsAndTheirCompaniesComponent;
  let fixture: ComponentFixture<AllStudentsAndTheirCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStudentsAndTheirCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStudentsAndTheirCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
