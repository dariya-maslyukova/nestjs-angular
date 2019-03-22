import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenLeggingsComponent } from './women-leggings.component';

describe('WomenLeggingsComponent', () => {
  let component: WomenLeggingsComponent;
  let fixture: ComponentFixture<WomenLeggingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenLeggingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenLeggingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
