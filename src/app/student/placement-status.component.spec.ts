import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementStatusComponent } from './placement-status.component';

describe('PlacementStatusComponent', () => {
  let component: PlacementStatusComponent;
  let fixture: ComponentFixture<PlacementStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
