import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../core/services/orders/payment.service';


@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

private readonly _ActivatedRoute = inject(ActivatedRoute);
private readonly _PaymentService = inject(PaymentService);
cartId!:string

detailsForm:FormGroup = new FormGroup({
  details: new FormControl(null , Validators.required),
  phone: new FormControl(null , Validators.required),
  city: new FormControl(null , Validators.required),
})


ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
      this.cartId =param.get('c_id') !
    }
  })
}




detailsSubmit(){
  console.log(this.detailsForm.value);

  if(this.detailsForm.valid){
    this._PaymentService.checkOutSession(this.cartId , this.detailsForm.value).subscribe({
      next:(res)=>{
        console.log( res);
        if(res.status == 'success'){
          window.open(res.session.url , '_self')
        }
        
      }
    })
  }
  
}
}
