import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceCoordinatorComponent } from './replace-coordinator.component';

describe('ReplaceCoordinatorComponent', () => {
  let component: ReplaceCoordinatorComponent;
  let fixture: ComponentFixture<ReplaceCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplaceCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
