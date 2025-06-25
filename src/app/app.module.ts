import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SupabaseService } from './services/supabase.service';
import { AppRoutingModule } from './app-routing.module';
import { TransacoesComponent } from './components/transacoes/transacoes.component';
import { ListaTransacoesComponent } from './components/lista-transacoes/lista-transacoes.component';
import { AdicionarTransacoesComponent } from './components/adicionar-transacoes/adicionar-transacoes.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HeaderComponentComponent } from './components/header-component/header-component.component';

@NgModule({
  declarations: [ 
    AppComponent,
    TransacoesComponent,
    ListaTransacoesComponent,
    AdicionarTransacoesComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegistroComponent,
    HeaderComponentComponent 
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  
  providers: [ SupabaseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }