import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementNotDoneComponent } from './placement-not-done.component';

describe('PlacementNotDoneComponent', () => {
  let component: PlacementNotDoneComponent;
  let fixture: ComponentFixture<PlacementNotDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementNotDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementNotDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
