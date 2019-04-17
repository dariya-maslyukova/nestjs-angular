import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenBlousesTopsComponent } from './women-blouses-tops.component';

describe('WomenBlousesTopsComponent', () => {
  let component: WomenBlousesTopsComponent;
  let fixture: ComponentFixture<WomenBlousesTopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenBlousesTopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenBlousesTopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
