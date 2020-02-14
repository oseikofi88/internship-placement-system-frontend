import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorLoginComponent } from './coordinator-login.component';

describe('CoordinatorLoginComponent', () => {
  let component: CoordinatorLoginComponent;
  let fixture: ComponentFixture<CoordinatorLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
