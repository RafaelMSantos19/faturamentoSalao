import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent {

  constructor(private router: Router) {}

  logout() {
    // Implementar logout quando necessário
    this.router.navigate(['/login']);
  }
}