import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpatientrecommendedcheckdialogComponent } from './addpatientrecommendedcheckdialog.component';

describe('AddpatientrecommendedcheckdialogComponent', () => {
  let component: AddpatientrecommendedcheckdialogComponent;
  let fixture: ComponentFixture<AddpatientrecommendedcheckdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpatientrecommendedcheckdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpatientrecommendedcheckdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
