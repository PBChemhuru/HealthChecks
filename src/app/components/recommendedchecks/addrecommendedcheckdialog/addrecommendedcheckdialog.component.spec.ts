import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrecommendedcheckdialogComponent } from './addrecommendedcheckdialog.component';

describe('AddrecommendedcheckdialogComponent', () => {
  let component: AddrecommendedcheckdialogComponent;
  let fixture: ComponentFixture<AddrecommendedcheckdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddrecommendedcheckdialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrecommendedcheckdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
