import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentialAppraisalFormsComponent } from './confidential-appraisal-forms.component';

describe('ConfidentialAppraisalFormsComponent', () => {
  let component: ConfidentialAppraisalFormsComponent;
  let fixture: ComponentFixture<ConfidentialAppraisalFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfidentialAppraisalFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfidentialAppraisalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
