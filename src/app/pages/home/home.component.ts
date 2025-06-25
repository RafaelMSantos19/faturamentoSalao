import { Component, OnInit } from '@angular/core';
import { SupabaseService, Transacao } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  transacoes: Transacao[] = [];
  transacoesFiltradas: Transacao[] = [];
  carregando = false;

  // Filtros
  filtroTipo = '';
  dataInicial = '';
  dataFinal = '';
  termoBusca = '';

  // Resumo financeiro
  totalReceitas = 0;
  totalDespesas = 0;
  saldoTotal = 0;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    await this.carregarTransacoes();
  }

  async carregarTransacoes(): Promise<void> {
    this.carregando = true;
    try {
      this.transacoes = await this.supabaseService.getTransacoes();
      this.aplicarFiltros();
      this.calcularResumo();
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      this.carregando = false;
    }
  }

  aplicarFiltros(): void {
    let transacoesFiltradas = [...this.transacoes];

    // Filtro por tipo
    if (this.filtroTipo) {
      transacoesFiltradas = transacoesFiltradas.filter(t => 
        t.tipo.toString() === this.filtroTipo
      );
    }

    // Filtro por data inicial
    if (this.dataInicial) {
      transacoesFiltradas = transacoesFiltradas.filter(t => 
        new Date(t.datahora) >= new Date(this.dataInicial)
      );
    }

    // Filtro por data final
    if (this.dataFinal) {
      transacoesFiltradas = transacoesFiltradas.filter(t => 
        new Date(t.datahora) <= new Date(this.dataFinal + 'T23:59:59')
      );
    }

    // Filtro por termo de busca
    if (this.termoBusca) {
      transacoesFiltradas = transacoesFiltradas.filter(t => 
        t.nome.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }

    // Ordenar por data (mais recente primeiro)
    transacoesFiltradas.sort((a, b) => 
      new Date(b.datahora).getTime() - new Date(a.datahora).getTime()
    );

    this.transacoesFiltradas = transacoesFiltradas;
    this.calcularResumoFiltrado();
  }

  limparFiltros(): void {
    this.filtroTipo = '';
    this.dataInicial = '';
    this.dataFinal = '';
    this.termoBusca = '';
    this.aplicarFiltros();
  }

  calcularResumo(): void {
    this.totalReceitas = this.transacoes
      .filter(t => t.tipo === 1)
      .reduce((sum, t) => sum + t.valor, 0);

    this.totalDespesas = this.transacoes
      .filter(t => t.tipo === 2)
      .reduce((sum, t) => sum + t.valor, 0);

    this.saldoTotal = this.totalReceitas - this.totalDespesas;
  }

  calcularResumoFiltrado(): void {
    const receitasFiltradas = this.transacoesFiltradas
      .filter(t => t.tipo === 1)
      .reduce((sum, t) => sum + t.valor, 0);

    const despesasFiltradas = this.transacoesFiltradas
      .filter(t => t.tipo === 2)
      .reduce((sum, t) => sum + t.valor, 0);

    // Se há filtros ativos, mostra os valores filtrados
    if (this.filtroTipo || this.dataInicial || this.dataFinal || this.termoBusca) {
      this.totalReceitas = receitasFiltradas;
      this.totalDespesas = despesasFiltradas;
      this.saldoTotal = receitasFiltradas - despesasFiltradas;
    }
  }

  async excluirTransacao(id: number): Promise<void> {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      try {
        await this.supabaseService.excluirTransacao(id);
        await this.carregarTransacoes();
      } catch (error) {
        console.error('Erro ao excluir transação:', error);
        alert('Erro ao excluir transação. Tente novamente.');
      }
    }
  }

  async atualizarDados(): Promise<void> {
    await this.carregarTransacoes();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}