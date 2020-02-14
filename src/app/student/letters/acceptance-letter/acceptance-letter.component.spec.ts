import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceLetterComponent } from './acceptance-letter.component';

describe('AcceptanceLetterComponent', () => {
  let component: AcceptanceLetterComponent;
  let fixture: ComponentFixture<AcceptanceLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
