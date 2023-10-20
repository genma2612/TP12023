import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntadosV2Component } from './preguntados-v2.component';

describe('PreguntadosV2Component', () => {
  let component: PreguntadosV2Component;
  let fixture: ComponentFixture<PreguntadosV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreguntadosV2Component]
    });
    fixture = TestBed.createComponent(PreguntadosV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
