import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaminantesComponent } from './contaminantes.component';

describe('ContaminantesComponent', () => {
  let component: ContaminantesComponent;
  let fixture: ComponentFixture<ContaminantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaminantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaminantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
