import { Component } from '@angular/core';
import { PaymentService } from '../../core/services/orders/payment.service';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {

  userOrders: any[] = [];
  userToken: any = { token: sessionStorage.getItem('token') };

  constructor(private _PaymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this._PaymentService.getUserOrders(this.userToken.token).subscribe({
      next: (res) => {
        console.log('Orders:', res.data);
        this.userOrders = res.data;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }
  
}
