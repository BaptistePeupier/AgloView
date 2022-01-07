import { TestBed } from '@angular/core/testing';

import { AnnonceurGuard } from './annonceur.guard';

describe('AnnonceurGuard', () => {
  let guard: AnnonceurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnnonceurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
