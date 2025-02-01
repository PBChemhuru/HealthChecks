import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelelterecommendedcheckdialogComponent } from './delelterecommendedcheckdialog.component';

describe('DelelterecommendedcheckdialogComponent', () => {
  let component: DelelterecommendedcheckdialogComponent;
  let fixture: ComponentFixture<DelelterecommendedcheckdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelelterecommendedcheckdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelelterecommendedcheckdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
