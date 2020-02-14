import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanyAndMakeOrderComponent } from './register-company-and-make-order.component';

describe('RegisterCompanyAndMakeOrderComponent', () => {
  let component: RegisterCompanyAndMakeOrderComponent;
  let fixture: ComponentFixture<RegisterCompanyAndMakeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCompanyAndMakeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCompanyAndMakeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
