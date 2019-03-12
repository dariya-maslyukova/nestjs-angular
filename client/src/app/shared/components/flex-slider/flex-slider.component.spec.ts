import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexSliderComponent } from './flex-slider.component';

describe('FlexSliderComponent', () => {
  let component: FlexSliderComponent;
  let fixture: ComponentFixture<FlexSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
