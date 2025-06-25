import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  formulario = new FormGroup({
    transacoes: new FormArray([])
  });

  enviando = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adicionarTransacao();
  }

  get transacoes(): FormArray {
    return this.formulario.get('transacoes') as FormArray;
  }

  adicionarTransacao(): void {
    const novaTransacao = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(0.01)]),
      tipo: new FormControl('', [Validators.required]),
      datahora: new FormControl(this.getDataHoraAtual(), [Validators.required])
    });

    this.transacoes.push(novaTransacao);
  }

  removerTransacao(index: number): void {
    if (this.transacoes.length > 1) {
      this.transacoes.removeAt(index);
    }
  }

  limparFormulario(): void {
    if (confirm('Tem certeza que deseja limpar todas as transações?')) {
      this.transacoes.clear();
      this.adicionarTransacao();
    }
  }

  isFieldInvalid(fieldName: string, index: number): boolean {
    const field = this.transacoes.at(index).get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async enviarFormulario(): Promise<void> {
    if (this.formulario.valid) {
      this.enviando = true;
      
      try {
        const transacoes = this.transacoes.value.map((transacao: any) => ({
          nome: transacao.nome.trim(),
          valor: parseFloat(transacao.valor),
          tipo: parseInt(transacao.tipo),
          datahora: new Date(transacao.datahora).toISOString(),
          user_id: '84a243ad-dbaf-48a6-8673-5513cda2127d' // Temporário - substituir por usuário logado
        }));

        const resultado = await this.supabaseService.inserirTransacoes(transacoes);
        
        if (resultado.success) {
          alert(`✅ ${transacoes.length} transação(ões) salva(s) com sucesso!`);
          this.router.navigate(['/home']);
        } else {
          throw new Error(resultado.error);
        }
      } catch (error) {
        console.error('Erro ao salvar transações:', error);
        alert('❌ Erro ao salvar transações. Tente novamente.');
      } finally {
        this.enviando = false;
      }
    } else {
      this.marcarCamposComoTocados();
      alert('⚠️ Por favor, preencha todos os campos obrigatórios.');
    }
  }

  marcarCamposComoTocados(): void {
    this.transacoes.controls.forEach(transacao => {
      Object.keys(transacao.controls).forEach(key => {
        transacao.get(key)?.markAsTouched();
      });
    });
  }

  calcularTotalReceitas(): number {
    return this.transacoes.value
      .filter((t: any) => t.tipo === '1' && t.valor)
      .reduce((sum: number, t: any) => sum + parseFloat(t.valor), 0);
  }

  calcularTotalDespesas(): number {
    return this.transacoes.value
      .filter((t: any) => t.tipo === '2' && t.valor)
      .reduce((sum: number, t: any) => sum + parseFloat(t.valor), 0);
  }

  calcularSaldo(): number {
    return this.calcularTotalReceitas() - this.calcularTotalDespesas();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  private getDataHoraAtual(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}