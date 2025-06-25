import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/enviroments/enviroment';

interface Transacao {
  id?: number;
  user_id: string;
  nome: string;
  valor: number;
  tipo: number;
  datahora: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get supabase(): SupabaseClient {
    return this.supabaseClient;
  }

  async getTransacoes(): Promise<Transacao[]> {
    try {
      const { data, error } = await this.supabaseClient
        .from('transacoes')
        .select('*')
        .order('datahora', { ascending: false });

      if (error) {
        console.error('Erro ao buscar transações:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erro no serviço getTransacoes:', error);
      return [];
    }
  }

  async inserirTransacoes(transacoes: Omit<Transacao, 'id'>[]): Promise<{success: boolean, error?: string}> {
    try {
      const { data, error } = await this.supabaseClient
        .from('transacoes')
        .insert(transacoes)
        .select();

      if (error) {
        console.error('Erro ao inserir transações:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Erro no serviço inserirTransacoes:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  async excluirTransacao(id: number): Promise<{success: boolean, error?: string}> {
    try {
      const { error } = await this.supabaseClient
        .from('transacoes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao excluir transação:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Erro no serviço excluirTransacao:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  async atualizarTransacao(id: number, transacao: Partial<Omit<Transacao, 'id'>>): Promise<{success: boolean, error?: string}> {
    try {
      const { data, error } = await this.supabaseClient
        .from('transacoes')
        .update(transacao)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Erro ao atualizar transação:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Erro no serviço atualizarTransacao:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }

  // Métodos para relatórios e estatísticas
  async getResumoFinanceiro(dataInicial?: string, dataFinal?: string): Promise<{
    totalReceitas: number;
    totalDespesas: number;
    saldoTotal: number;
    quantidadeTransacoes: number;
  }> {
    try {
      let query = this.supabaseClient
        .from('transacoes')
        .select('valor, tipo');

      if (dataInicial) {
        query = query.gte('datahora', dataInicial);
      }

      if (dataFinal) {
        query = query.lte('datahora', dataFinal);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Erro ao buscar resumo financeiro:', error);
        throw error;
      }

      const transacoes = data || [];
      const totalReceitas = transacoes
        .filter(t => t.tipo === 1)
        .reduce((sum, t) => sum + t.valor, 0);

      const totalDespesas = transacoes
        .filter(t => t.tipo === 2)
        .reduce((sum, t) => sum + t.valor, 0);

      return {
        totalReceitas,
        totalDespesas,
        saldoTotal: totalReceitas - totalDespesas,
        quantidadeTransacoes: transacoes.length
      };
    } catch (error) {
      console.error('Erro no serviço getResumoFinanceiro:', error);
      return {
        totalReceitas: 0,
        totalDespesas: 0,
        saldoTotal: 0,
        quantidadeTransacoes: 0
      };
    }
  }
}