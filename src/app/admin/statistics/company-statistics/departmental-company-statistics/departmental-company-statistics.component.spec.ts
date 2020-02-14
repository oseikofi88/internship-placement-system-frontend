import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentalCompanyStatisticsComponent } from './departmental-company-statistics.component';

describe('DepartmentalCompanyStatisticsComponent', () => {
  let component: DepartmentalCompanyStatisticsComponent;
  let fixture: ComponentFixture<DepartmentalCompanyStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentalCompanyStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentalCompanyStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
