import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../class/custom-validators';
import { ApiService } from '../services/api.service';
import { ToastMessageService } from '../services/toast-message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastMessageService: ToastMessageService
  ) { }

  get fm() {
    return this.signupForm.controls;
  }

  createsignupForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(CustomValidators.onlyChars)]],
      email: ['', [Validators.required, Validators.pattern(CustomValidators.email)]],
      password: ['hello', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(CustomValidators.phoneNumber)]]
    });
  }

  onSubmitForm() {
    if (this.signupForm.valid) {
      const values = this.signupForm.getRawValue();
      let signupData: any = {
        name: values.name || '',
        email: values.email || '',
        password: values.password || '',
        mobile: values.mobile || ''
      };

      this.signupUser(signupData);
    }
  }

  signupUser(signupData: any) {
    this.apiService.post('signup', signupData).subscribe(
      data => {
        localStorage.setItem('auth_token', data.token);
        this.signupForm.reset();
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
    this.createsignupForm();
  }


}
