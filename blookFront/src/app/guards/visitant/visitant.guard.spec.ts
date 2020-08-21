import { TestBed } from '@angular/core/testing';

import { VisitantGuard } from './visitant.guard';

describe('VisitantGuard', () => {
  let guard: VisitantGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VisitantGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
