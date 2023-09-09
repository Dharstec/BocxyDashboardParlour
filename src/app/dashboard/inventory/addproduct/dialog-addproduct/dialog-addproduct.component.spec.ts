import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddproductComponent } from './dialog-addproduct.component';

describe('DialogAddproductComponent', () => {
  let component: DialogAddproductComponent;
  let fixture: ComponentFixture<DialogAddproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
