import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientslistItemComponent } from './patientslist-item.component';

describe('PatientslistItemComponent', () => {
  let component: PatientslistItemComponent;
  let fixture: ComponentFixture<PatientslistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientslistItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientslistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
