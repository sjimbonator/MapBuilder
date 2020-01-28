import { TestBed } from '@angular/core/testing';

import { MarkerStyleService } from './marker-style.service';

describe('MarkerStyleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkerStyleService = TestBed.get(MarkerStyleService);
    expect(service).toBeTruthy();
  });
});
