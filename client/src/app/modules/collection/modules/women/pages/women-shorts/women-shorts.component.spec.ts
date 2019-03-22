import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenShortsComponent } from './women-shorts.component';

describe('WomenShortsComponent', () => {
  let component: WomenShortsComponent;
  let fixture: ComponentFixture<WomenShortsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenShortsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenShortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
