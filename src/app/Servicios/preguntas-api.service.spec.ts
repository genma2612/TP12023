import { TestBed } from '@angular/core/testing';

import { PreguntasAPIService } from './preguntas-api.service';

describe('PreguntasAPIService', () => {
  let service: PreguntasAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntasAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
