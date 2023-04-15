import { TestBed } from '@angular/core/testing';

import { CanaccessGuard } from './canaccess.guard';

describe('CanaccessGuard', () => {
  let guard: CanaccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanaccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
