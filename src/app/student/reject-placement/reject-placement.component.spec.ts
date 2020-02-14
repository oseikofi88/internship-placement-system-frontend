import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectPlacementComponent } from './reject-placement.component';

describe('RejectPlacementComponent', () => {
  let component: RejectPlacementComponent;
  let fixture: ComponentFixture<RejectPlacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectPlacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
