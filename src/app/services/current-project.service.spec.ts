import { TestBed, inject } from '@angular/core/testing';

import { CurrentProjectService } from './current-project.service';

describe('CurrentProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentProjectService]
    });
  });

  it('should be created', inject([CurrentProjectService], (service: CurrentProjectService) => {
    expect(service).toBeTruthy();
  }));
});
