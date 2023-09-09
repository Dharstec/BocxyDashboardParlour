import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsAddEditComponent } from './coupons-add-edit.component';

describe('CouponsAddEditComponent', () => {
  let component: CouponsAddEditComponent;
  let fixture: ComponentFixture<CouponsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
