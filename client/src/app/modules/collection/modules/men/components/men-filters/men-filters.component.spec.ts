import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenFiltersComponent } from './men-filters.component';

describe('MenFiltersComponent', () => {
  let component: MenFiltersComponent;
  let fixture: ComponentFixture<MenFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
