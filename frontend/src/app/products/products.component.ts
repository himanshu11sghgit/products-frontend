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

  public orderNumber: string = '';
  public isEdit: boolean = false;
  public isView: boolean = false;

  public modalRef: any;
  public modalConfigLg = Constants.lightGreyBackdropModalLg;
  public orderForm: FormGroup;
  public orders: any;

  get f() { return this.orderForm.controls }

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastMessageService: ToastMessageService
  ) { }

  openModal(modalRef: any, data?: any, isView?: any, isEdit?: any) {
    this.resetFormData();
    if (isView) {
      this.orderNumber = data._id;
      this.isView = true;
      this.orderForm.patchValue({
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        dueDate: data.dueDate,
        orderTotal: data.orderTotal,
        customerAddress: data.customerAddress
      })
    }
    if (isEdit) {
      this.orderNumber = data._id;
      this.isEdit = true;
      this.orderForm.patchValue({
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        dueDate: data.dueDate,
        orderTotal: data.orderTotal,
        customerAddress: data.customerAddress
      })
    }
    this.modalRef = this.modalService.open(modalRef, this.modalConfigLg);
  }

  resetFormData() {
    this.orderForm.reset();
    this.isEdit = false;
    this.isView = false;
    this.orderNumber = '';
  }

  openDeleteModal(modalRef: any, data?: any) {
    this.orderNumber = data._id;
    this.modalRef = this.modalService.open(modalRef, this.modalConfigLg);
  }

  closeModal() {
    if (this.modalRef) {
      this.isEdit = false;
      this.isView = false;
      this.modalRef.dismiss();
    }
  }

  onDelete() {
    this.apiService.delete(`order/${this.orderNumber}`).subscribe(
      data => {
        this.getAllOrders();
        this.modalRef.dismiss();
        this.toastMessageService.showSuccess(data.message);
      },
      err => {
        this.toastMessageService.showError(err.errors.msg)
      },
      () => { }
    )
  }

  createOrderForm() {
    this.orderForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.pattern(CustomValidators.onlyChars)]],
      customerPhone: ['', [Validators.required, Validators.pattern(CustomValidators.phoneNumber)]],
      dueDate: ['', Validators.required],
      orderTotal: ['', Validators.required],
      customerAddress: ['', Validators.required]
    });
  }


  onSubmitForm() {
    if (this.orderForm.valid) {
      const values = this.orderForm.getRawValue();

      let orderData = {
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        dueDate: values.dueDate,
        orderTotal: values.orderTotal,
        customerAddress: values.customerAddress
      }
      this.addNewOrder(orderData);
    } else {
      console.log('error')
    }
  }

  onUpdateForm() {
    if (this.orderForm.valid) {
      const values = this.orderForm.getRawValue();

      let orderData = {
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        dueDate: values.dueDate,
        orderTotal: values.orderTotal,
        customerAddress: values.customerAddress
      }
      this.updateOrder(orderData);
    } else {
      console.log('error')
    }
  }

  updateOrder(orderData: any) {
    this.apiService.put(`order/${this.orderNumber}`, orderData).subscribe(
      data => {
        this.getAllOrders();
        this.modalRef.dismiss();
        this.toastMessageService.showSuccess(data.message)
      },
      err => {
        console.log('err', err)
      },
      () => { }
    )
  }

  addNewOrder(orderData: any) {
    this.apiService.post('orders', orderData).subscribe(
      data => {
        this.getAllOrders();
        this.modalRef.dismiss();
        this.toastMessageService.showSuccess(data.message);
      },
      err => {
        console.log('err', err)
      },
      () => { }
    )
  }

  getAllOrders() {
    this.apiService.get('orders').subscribe(
      data => {
        this.orders = data.data
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
    this.createOrderForm();
    this.getAllOrders();
  }


}
