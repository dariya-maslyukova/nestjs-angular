import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenSweatshirtsComponent } from './women-sweatshirts.component';

describe('WomenSweatshirtsComponent', () => {
  let component: WomenSweatshirtsComponent;
  let fixture: ComponentFixture<WomenSweatshirtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenSweatshirtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenSweatshirtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
