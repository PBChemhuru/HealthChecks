import { TestBed } from '@angular/core/testing';

import { RecommendedchecksService } from './recommendedchecks.service';

describe('RecommendedchecksService', () => {
  let service: RecommendedchecksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendedchecksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
