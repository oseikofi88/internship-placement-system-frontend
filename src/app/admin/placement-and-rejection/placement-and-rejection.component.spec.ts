import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementAndRejectionComponent } from './placement-and-rejection.component';

describe('PlacementAndRejectionComponent', () => {
  let component: PlacementAndRejectionComponent;
  let fixture: ComponentFixture<PlacementAndRejectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementAndRejectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementAndRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
