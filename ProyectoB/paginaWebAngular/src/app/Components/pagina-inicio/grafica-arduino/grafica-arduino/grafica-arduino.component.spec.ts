import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaArduinoComponent } from './grafica-arduino.component';

describe('GraficaArduinoComponent', () => {
  let component: GraficaArduinoComponent;
  let fixture: ComponentFixture<GraficaArduinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaArduinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaArduinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
