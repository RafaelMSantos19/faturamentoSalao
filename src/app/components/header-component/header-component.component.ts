import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {
    // Implementar lógica de logout aqui
    console.log('Logout executado');
    // Por exemplo: limpar localStorage, redirecionar para login, etc.
  }

}