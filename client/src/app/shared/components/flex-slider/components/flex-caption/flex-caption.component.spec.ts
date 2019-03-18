import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexCaptionComponent } from './flex-caption.component';

describe('FlexCaptionComponent', () => {
  let component: FlexCaptionComponent;
  let fixture: ComponentFixture<FlexCaptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexCaptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
