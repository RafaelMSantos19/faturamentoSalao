import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-adicionar-transacoes',
  templateUrl: './adicionar-transacoes.component.html',
  styleUrls: ['./adicionar-transacoes.component.scss']
})
export class AdicionarTransacoesComponent implements OnInit {

  formulario = new FormGroup({
    transacoes: new FormArray([])
  });

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.adicionarTransacao();
  }

  get transacoes(): FormArray {
    return this.formulario.get('transacoes') as FormArray;
  }

  adicionarTransacao(): void {
    this.transacoes.push(new FormGroup({
      nome: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      datahora: new FormControl('', Validators.required)
    }));
  }

  removerTransacao(index: number): void {
    this.transacoes.removeAt(index);
  }

  async enviarFormulario(): Promise<void> {
    if (this.formulario.valid) {
      const transacoes = this.transacoes.value.map((transacao: any) => ({
        nome: transacao.nome,
        valor: parseInt(transacao.valor),
        tipo: parseInt(transacao.tipo),
        datahora: new Date(transacao.datahora).toISOString(),
        user_id: '84a243ad-dbaf-48a6-8673-5513cda2127d' 
      }));
      const { data, error } = await this.supabaseService.supabase.from('transacoes').insert(transacoes);
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        this.formulario.reset();
        this.transacoes.clear();
        this.adicionarTransacao();
      }
    }
  }

}