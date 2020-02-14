import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHomepageComponent } from './company-homepage.component';

describe('CompanyHomepageComponent', () => {
  let component: CompanyHomepageComponent;
  let fixture: ComponentFixture<CompanyHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
