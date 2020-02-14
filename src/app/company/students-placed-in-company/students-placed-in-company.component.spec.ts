import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsPlacedInCompanyComponent } from './students-placed-in-company.component';

describe('StudentsPlacedInCompanyComponent', () => {
  let component: StudentsPlacedInCompanyComponent;
  let fixture: ComponentFixture<StudentsPlacedInCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsPlacedInCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsPlacedInCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
