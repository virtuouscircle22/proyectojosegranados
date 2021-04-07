import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiosComponent } from './propios.component';

describe('PropiosComponent', () => {
  let component: PropiosComponent;
  let fixture: ComponentFixture<PropiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
