import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

interface Transacao{
  id: number;
  user_id: string;
  nome: string;
  valor: number;
  tipo: number;
  datahora: Date;
}

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.scss']
})
export class TransacoesComponent implements OnInit {

  transacoes: Transacao[] = [];

  constructor(private supabaseService: SupabaseService) { }

    async ngOnInit(): Promise<void> {
      this.transacoes = await this.supabaseService.getTransacoes();
      console.log(this.transacoes);
    }
  

}
