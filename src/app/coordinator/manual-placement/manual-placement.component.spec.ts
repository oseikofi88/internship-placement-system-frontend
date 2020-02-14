import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPlacementComponent } from './manual-placement.component';

describe('ManualPlacementComponent', () => {
  let component: ManualPlacementComponent;
  let fixture: ComponentFixture<ManualPlacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualPlacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
