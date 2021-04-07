import { TestBed } from '@angular/core/testing';

import { GraficaHistoricosService } from './grafica-historicos.service';

describe('GraficaHistoricosService', () => {
  let service: GraficaHistoricosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficaHistoricosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
