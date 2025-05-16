import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusGraphicComponent } from './order-status-graphic.component';

describe('OrderStatusGraphicComponent', () => {
  let component: OrderStatusGraphicComponent;
  let fixture: ComponentFixture<OrderStatusGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderStatusGraphicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStatusGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
