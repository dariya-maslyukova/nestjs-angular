import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenGymComponent } from './women-gym.component';

describe('WomenGymComponent', () => {
  let component: WomenGymComponent;
  let fixture: ComponentFixture<WomenGymComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenGymComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
