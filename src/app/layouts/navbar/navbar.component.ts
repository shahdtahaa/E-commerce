import { AuthService } from './../../core/services/authentication/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);

  navCartCount!: number;

  logOut() {
    sessionStorage.removeItem('token');
    this._AuthService.logOut();
    this._Router.navigate(['/login']);
  }

  ngOnInit(): void {
    this._CartService.cartCount.subscribe({
      next: (value) => {
        this.navCartCount =value;
      },
    });
  }
}
