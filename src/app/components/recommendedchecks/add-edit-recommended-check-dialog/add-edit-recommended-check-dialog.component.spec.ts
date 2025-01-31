import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecommendedCheckDialogComponent } from './add-edit-recommended-check-dialog.component';

describe('AddEditRecommendedCheckDialogComponent', () => {
  let component: AddEditRecommendedCheckDialogComponent;
  let fixture: ComponentFixture<AddEditRecommendedCheckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRecommendedCheckDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRecommendedCheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
