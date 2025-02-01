import { TestBed } from '@angular/core/testing';

import { PatientchecksService } from './patientchecks.service';

describe('PatientchecksService', () => {
  let service: PatientchecksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientchecksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
