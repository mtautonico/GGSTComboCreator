import { TestBed } from '@angular/core/testing';

import { ProcessInputService } from './process-input.service';

describe('ProcessInputService', () => {
  let service: ProcessInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
