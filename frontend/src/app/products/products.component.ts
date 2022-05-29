import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '../class/constant';
import { CustomValidators } from '../class/custom-validators';
import { ApiService } from '../services/api.service';
import { ToastMessageService } from '../services/toast-message.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  public products: any;



  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }





  getAllProducts() {
    this.apiService.get('products').subscribe(
      data => {
        this.products = data.data
      },
      err => {
        console.log('err', err)
      },
      () => { }
    )
  }

  logout() {
    localStorage.setItem('auth_token', '');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getAllProducts();
  }


}
