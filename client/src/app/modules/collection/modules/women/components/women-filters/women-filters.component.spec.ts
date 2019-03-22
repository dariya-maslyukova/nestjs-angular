import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenFiltersComponent } from './women-filters.component';

describe('WomenFiltersComponent', () => {
  let component: WomenFiltersComponent;
  let fixture: ComponentFixture<WomenFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
