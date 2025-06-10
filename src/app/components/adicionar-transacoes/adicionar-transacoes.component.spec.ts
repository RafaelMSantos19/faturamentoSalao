import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarTransacoesComponent } from './adicionar-transacoes.component';

describe('AdicionarTransacoesComponent', () => {
  let component: AdicionarTransacoesComponent;
  let fixture: ComponentFixture<AdicionarTransacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarTransacoesComponent]
    });
    fixture = TestBed.createComponent(AdicionarTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
