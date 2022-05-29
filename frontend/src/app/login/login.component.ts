import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastMessageService } from '../services/toast-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastMessageService: ToastMessageService
  ) { }

  get fm() {
    return this.loginForm.controls;
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['balwantsingh3186@gmail.com', [Validators.required, Validators.email]],
      password: ['hello', [Validators.required]],
    });
  }

  onSubmitForm() {
    if (this.loginForm.valid) {
      const values = this.loginForm.getRawValue();
      let loginData: any = {
        email: values.email || '',
        password: values.password || '',
      };

      this.loginUser(loginData);
    }
  }

  loginUser(loginData: any) {
    this.apiService.post('login', loginData).subscribe(
      data => {
        localStorage.setItem('auth_token', data.token);
        this.loginForm.reset();
        this.router.navigate(['/products']);
      },
      err => {
        const error = err.error.errors
        if (error.email) {
          this.toastMessageService.showError(error.email)
        } else if (error.password) {
          this.toastMessageService.showError(error.password)
        }
      },
      () => { }
    )
  }


  ngOnInit(): void {
    this.createLoginForm();
  }

}
