import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddressEditorComponent } from './billing-address-editor.component';

describe('BillingAddressEditorComponent', () => {
  let component: BillingAddressEditorComponent;
  let fixture: ComponentFixture<BillingAddressEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingAddressEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingAddressEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
