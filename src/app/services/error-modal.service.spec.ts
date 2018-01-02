import { TestBed, inject } from '@angular/core/testing';

import { ErrorModalService } from './error-modal.service';

describe('ErrorModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorModalService]
    });
  });

  it('should be created', inject([ErrorModalService], (service: ErrorModalService) => {
    expect(service).toBeTruthy();
  }));
});
