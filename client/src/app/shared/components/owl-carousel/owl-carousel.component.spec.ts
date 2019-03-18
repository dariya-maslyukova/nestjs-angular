import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlCarouselComponent } from './owl-carousel.component';

describe('OwlCarouselComponent', () => {
  let component: OwlCarouselComponent;
  let fixture: ComponentFixture<OwlCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwlCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwlCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
