import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentalStudentStatisticsComponent } from './departmental-student-statistics.component';

describe('DepartmentalStudentStatisticsComponent', () => {
  let component: DepartmentalStudentStatisticsComponent;
  let fixture: ComponentFixture<DepartmentalStudentStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentalStudentStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentalStudentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
