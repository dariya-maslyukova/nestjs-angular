import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLayoutComponent } from './product-layout.component';

describe('ProductLayoutComponent', () => {
  let component: ProductLayoutComponent;
  let fixture: ComponentFixture<ProductLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
