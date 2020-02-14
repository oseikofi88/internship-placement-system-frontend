import { TestBed, inject } from '@angular/core/testing';

import { PlacementService } from './placement.service';

describe('PlacementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlacementService]
    });
  });

  it('should be created', inject([PlacementService], (service: PlacementService) => {
    expect(service).toBeTruthy();
  }));
});
