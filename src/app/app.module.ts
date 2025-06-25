import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AdicionarTransacoesComponent } from './components/adicionar-transacoes/adicionar-transacoes.component';
import { TransacoesComponent } from './components/transacoes/transacoes.component';
import { HeaderComponent } from './components/header-component/header-component.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdicionarTransacoesComponent,
    TransacoesComponent,
    HeaderComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }