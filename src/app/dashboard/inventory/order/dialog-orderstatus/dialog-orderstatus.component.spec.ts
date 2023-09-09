import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderstatusComponent } from './dialog-orderstatus.component';

describe('DialogOrderstatusComponent', () => {
  let component: DialogOrderstatusComponent;
  let fixture: ComponentFixture<DialogOrderstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOrderstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
