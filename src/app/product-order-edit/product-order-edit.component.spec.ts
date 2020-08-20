import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderEditComponent } from './product-order-edit.component';

describe('ProductOrderEditComponent', () => {
  let component: ProductOrderEditComponent;
  let fixture: ComponentFixture<ProductOrderEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOrderEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
