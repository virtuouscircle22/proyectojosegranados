import { TestBed } from '@angular/core/testing';

import { GraficaArduinoService } from './grafica-arduino.service';

describe('GraficaArduinoService', () => {
  let service: GraficaArduinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficaArduinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
