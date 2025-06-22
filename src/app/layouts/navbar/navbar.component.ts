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
  isLoggedIn: boolean = false;

  logOut() {
    sessionStorage.removeItem('token');
    this._AuthService.logOut();
    this.isLoggedIn = false; // update login state
    this._Router.navigate(['/login']);
  }

  ngOnInit(): void {
    // Determine login state based on token presence
    this.isLoggedIn = !!sessionStorage.getItem('token');

    // Listen for cart count changes
    this._CartService.cartCount.subscribe({
      next: (value) => {
        this.navCartCount = value;
      },
    });
  }
}
