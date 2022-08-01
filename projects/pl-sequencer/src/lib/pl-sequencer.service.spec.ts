import { TestBed } from '@angular/core/testing';

import { PlSequencerService } from './pl-sequencer.service';

describe('PlSequencerService', () => {
  let service: PlSequencerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlSequencerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
