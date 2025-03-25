import { TestBed } from '@angular/core/testing';

import { JeuVideoService } from './jeu-video.service';

describe('JeuVideoService', () => {
  let service: JeuVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JeuVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
