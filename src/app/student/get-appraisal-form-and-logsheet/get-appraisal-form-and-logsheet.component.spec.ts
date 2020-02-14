import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAppraisalFormAndLogsheetComponent } from './get-appraisal-form-and-logsheet.component';

describe('GetAppraisalFormAndLogsheetComponent', () => {
  let component: GetAppraisalFormAndLogsheetComponent;
  let fixture: ComponentFixture<GetAppraisalFormAndLogsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAppraisalFormAndLogsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAppraisalFormAndLogsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
