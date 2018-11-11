import { TestBed, inject } from '@angular/core/testing';

import { AdditionService } from './addition.service';

describe('AdditionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdditionService]
    });
  });

  it('should be created', inject([AdditionService], (service: AdditionService) => {
    expect(service).toBeTruthy();
  }));
});
