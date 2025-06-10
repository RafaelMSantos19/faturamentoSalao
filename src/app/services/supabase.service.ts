// supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/enviroments/enviroment';

const supabaseUrl = environment.supabaseUrl;
const supabaseKey = environment.supabaseKey;
const supabaseSecret = environment.supabaseSecret;

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabase = createClient(supabaseUrl, supabaseKey);

  constructor() { }

  async getTransacoes(): Promise<any[]> {
    const { data, error } = await this.supabase.from('transacoes').select('*');
    if (error) {
        console.error(error);
        return [];
    }
    return data;
  }


}