import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentalGraphStatisticsComponent } from './departmental-graph-statistics.component';

describe('DepartmentalGraphStatisticsComponent', () => {
  let component: DepartmentalGraphStatisticsComponent;
  let fixture: ComponentFixture<DepartmentalGraphStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentalGraphStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentalGraphStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
