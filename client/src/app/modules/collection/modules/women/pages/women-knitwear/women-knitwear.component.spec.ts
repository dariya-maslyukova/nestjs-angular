import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenKnitwearComponent } from './women-knitwear.component';

describe('WomenKnitwearComponent', () => {
  let component: WomenKnitwearComponent;
  let fixture: ComponentFixture<WomenKnitwearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenKnitwearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenKnitwearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
