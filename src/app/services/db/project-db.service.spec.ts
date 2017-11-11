import { TestBed, inject } from '@angular/core/testing';

import { ProjectDBService } from './project-db.service';

describe('ProjectDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectDBService]
    });
  });

  it('should be created', inject([ProjectDBService], (service: ProjectDBService) => {
    expect(service).toBeTruthy();
  }));
});
