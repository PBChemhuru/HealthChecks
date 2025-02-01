import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrecommendedcheckdialogComponent } from './editrecommendedcheckdialog.component';

describe('EditrecommendedcheckdialogComponent', () => {
  let component: EditrecommendedcheckdialogComponent;
  let fixture: ComponentFixture<EditrecommendedcheckdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditrecommendedcheckdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditrecommendedcheckdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
