import { Component, OnInit } from '@angular/core';
import { SupabaseService, Transacao } from 'src/app/services/supabase.service';

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