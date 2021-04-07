import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaHistoricosComponent } from './grafica-historicos.component';

describe('GraficaHistoricosComponent', () => {
  let component: GraficaHistoricosComponent;
  let fixture: ComponentFixture<GraficaHistoricosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaHistoricosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaHistoricosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
