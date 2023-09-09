import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingAddEditComponent } from './marketing-add-edit.component';

describe('MarketingAddEditComponent', () => {
  let component: MarketingAddEditComponent;
  let fixture: ComponentFixture<MarketingAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
