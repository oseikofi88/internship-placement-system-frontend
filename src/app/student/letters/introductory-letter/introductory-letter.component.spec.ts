import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductoryLetterComponent } from './introductory-letter.component';

describe('IntroductoryLetterComponent', () => {
  let component: IntroductoryLetterComponent;
  let fixture: ComponentFixture<IntroductoryLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductoryLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductoryLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
