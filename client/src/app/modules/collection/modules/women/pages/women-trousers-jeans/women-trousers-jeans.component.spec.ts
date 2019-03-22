import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenTrousersJeansComponent } from './women-trousers-jeans.component';

describe('WomenTrousersJeansComponent', () => {
  let component: WomenTrousersJeansComponent;
  let fixture: ComponentFixture<WomenTrousersJeansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenTrousersJeansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenTrousersJeansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
