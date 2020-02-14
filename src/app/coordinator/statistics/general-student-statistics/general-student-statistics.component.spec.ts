import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStudentStatisticsComponent } from './general-student-statistics.component';

describe('GeneralStudentStatisticsComponent', () => {
  let component: GeneralStudentStatisticsComponent;
  let fixture: ComponentFixture<GeneralStudentStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralStudentStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStudentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
