import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTransacoesComponent } from './lista-transacoes.component';

describe('ListaTransacoesComponent', () => {
  let component: ListaTransacoesComponent;
  let fixture: ComponentFixture<ListaTransacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaTransacoesComponent]
    });
    fixture = TestBed.createComponent(ListaTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
