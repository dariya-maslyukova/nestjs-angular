import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenJacketsCoatsComponent } from './men-jackets-coats.component';

describe('MenJacketsCoatsComponent', () => {
  let component: MenJacketsCoatsComponent;
  let fixture: ComponentFixture<MenJacketsCoatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenJacketsCoatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenJacketsCoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
