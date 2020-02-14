import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentalCompanyDetailsStatisticsComponent } from './departmental-company-details-statistics.component';

describe('DepartmentalCompanyDetailsStatisticsComponent', () => {
  let component: DepartmentalCompanyDetailsStatisticsComponent;
  let fixture: ComponentFixture<DepartmentalCompanyDetailsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentalCompanyDetailsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentalCompanyDetailsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
