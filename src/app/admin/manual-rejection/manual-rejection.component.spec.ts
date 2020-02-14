import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualRejectionComponent } from './manual-rejection.component';

describe('ManualRejectionComponent', () => {
  let component: ManualRejectionComponent;
  let fixture: ComponentFixture<ManualRejectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualRejectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
