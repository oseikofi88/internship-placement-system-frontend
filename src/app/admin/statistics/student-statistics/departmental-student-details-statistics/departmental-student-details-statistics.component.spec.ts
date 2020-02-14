import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentalStudentDetailsStatisticsComponent } from './departmental-student-details-statistics.component';

describe('DepartmentalStudentDetailsStatisticsComponent', () => {
  let component: DepartmentalStudentDetailsStatisticsComponent;
  let fixture: ComponentFixture<DepartmentalStudentDetailsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentalStudentDetailsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentalStudentDetailsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
