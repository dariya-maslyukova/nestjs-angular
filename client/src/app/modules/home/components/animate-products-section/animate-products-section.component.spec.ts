import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateProductsSectionComponent } from './animate-products-section.component';

describe('AnimateProductsSectionComponent', () => {
  let component: AnimateProductsSectionComponent;
  let fixture: ComponentFixture<AnimateProductsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateProductsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
