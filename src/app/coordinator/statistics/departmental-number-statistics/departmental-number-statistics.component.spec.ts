import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentStatisticsComponent } from './department-statistics.component';

describe('DepartmentStatisticsComponent', () => {
  let component: DepartmentStatisticsComponent;
  let fixture: ComponentFixture<DepartmentStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
