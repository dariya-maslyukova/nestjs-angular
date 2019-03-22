import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenLayoutComponent } from './women-layout.component';

describe('WomenLayoutComponent', () => {
  let component: WomenLayoutComponent;
  let fixture: ComponentFixture<WomenLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
