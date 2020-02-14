import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralCompanyStatisticsComponent } from './general-company-statistics.component';

describe('GeneralCompanyStatisticsComponent', () => {
  let component: GeneralCompanyStatisticsComponent;
  let fixture: ComponentFixture<GeneralCompanyStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralCompanyStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralCompanyStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
