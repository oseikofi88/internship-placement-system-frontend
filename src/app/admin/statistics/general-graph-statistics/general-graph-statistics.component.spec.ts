import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphStatisticsComponent } from './graph-statistics.component';

describe('GraphStatisticsComponent', () => {
  let component: GraphStatisticsComponent;
  let fixture: ComponentFixture<GraphStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
