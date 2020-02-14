import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceStudentsComponent } from './place-students.component';

describe('PlaceStudentsComponent', () => {
  let component: PlaceStudentsComponent;
  let fixture: ComponentFixture<PlaceStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
