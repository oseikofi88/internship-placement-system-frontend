import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegistrationComponent } from './company-registration.component';

describe('CompanyRegistrationComponent', () => {
  let component: CompanyRegistrationComponent;
  let fixture: ComponentFixture<CompanyRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
