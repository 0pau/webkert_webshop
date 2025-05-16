import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddressCardComponent } from './billing-address-card.component';

describe('BillingAddressCardComponent', () => {
  let component: BillingAddressCardComponent;
  let fixture: ComponentFixture<BillingAddressCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingAddressCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingAddressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
