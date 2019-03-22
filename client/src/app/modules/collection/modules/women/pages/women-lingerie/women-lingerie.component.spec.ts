import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenLingerieComponent } from './women-lingerie.component';

describe('WomenLingerieComponent', () => {
  let component: WomenLingerieComponent;
  let fixture: ComponentFixture<WomenLingerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenLingerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenLingerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
