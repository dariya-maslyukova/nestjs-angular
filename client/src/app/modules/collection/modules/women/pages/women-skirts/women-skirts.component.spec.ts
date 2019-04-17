import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenSkirtsComponent } from './women-skirts.component';

describe('WomenSkirtsComponent', () => {
  let component: WomenSkirtsComponent;
  let fixture: ComponentFixture<WomenSkirtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenSkirtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenSkirtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
