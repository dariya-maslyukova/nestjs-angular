import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenTShirtsComponent } from './women-t-shirts.component';

describe('WomenTShirtsComponent', () => {
  let component: WomenTShirtsComponent;
  let fixture: ComponentFixture<WomenTShirtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenTShirtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenTShirtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
