import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericUpDownComponent } from './numeric-up-down.component';

describe('NumericUpDownComponent', () => {
  let component: NumericUpDownComponent;
  let fixture: ComponentFixture<NumericUpDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumericUpDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericUpDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
