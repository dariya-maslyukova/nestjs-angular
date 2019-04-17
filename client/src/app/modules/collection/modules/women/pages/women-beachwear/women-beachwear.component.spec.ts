import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenBeachwearComponent } from './women-beachwear.component';

describe('WomenBeachwearComponent', () => {
  let component: WomenBeachwearComponent;
  let fixture: ComponentFixture<WomenBeachwearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenBeachwearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenBeachwearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
