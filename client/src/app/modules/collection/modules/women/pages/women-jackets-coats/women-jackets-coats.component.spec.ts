import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenJacketsCoatsComponent } from './women-jackets-coats.component';

describe('WomenJacketsCoatsComponent', () => {
  let component: WomenJacketsCoatsComponent;
  let fixture: ComponentFixture<WomenJacketsCoatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenJacketsCoatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenJacketsCoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
