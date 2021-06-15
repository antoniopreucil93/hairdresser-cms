import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';

enum EUserRoles {
  SUPERADMIN = 1,
  HAIRDRESSER_ADMIN = 2,
  USER = 3,
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formGroupLogin: any;
  formGroupRegistration: any;

  constructor(private readonly apiService: ApiService, private router: Router) {
    this.initForm();
    this.initRegistrationForm();
  }

  ngOnInit(): void {}

  async login() {
    const loginPayload = {
      username: this.formGroupLogin.controls['username'].value,
      password: this.formGroupLogin.controls['password'].value,
    };

    const loginSuccess: any = await this.apiService.login(loginPayload);
    localStorage.setItem('accessToken', loginSuccess.accessToken);
    localStorage.setItem('role', loginSuccess.role);
    localStorage.setItem('userId', loginSuccess.id);

    if (loginSuccess.role === EUserRoles.HAIRDRESSER_ADMIN)
      localStorage.setItem('hairSalonId', loginSuccess.hairSalonId);

    this.router.navigateByUrl('dashboard');
  }

  async logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
  }

  async register() {
    const registerPayload = {
      username: this.formGroupRegistration.controls['usernamereg'].value,
      password: this.formGroupRegistration.controls['passwordreg'].value,
      role: this.formGroupRegistration.controls['role'].value,
      firstName: this.formGroupRegistration.controls['firstName'].value,
      lastName: this.formGroupRegistration.controls['lastName'].value,
      phone: this.formGroupRegistration.controls['phone'].value,
      address: this.formGroupRegistration.controls['address'].value,
    };

    const newUser: any = await this.apiService.register(registerPayload);

    localStorage.setItem('accessToken', newUser.accessToken);
    localStorage.setItem('role', newUser.role);
    localStorage.setItem('userId', newUser.id);
    this.router.navigateByUrl('dashboard');
  }

  initForm() {
    this.formGroupLogin = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  initRegistrationForm() {
    this.formGroupRegistration = new FormGroup({
      usernamereg: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      passwordreg: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      role: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  get username() {
    return this.formGroupLogin.get('username');
  }

  get password() {
    return this.formGroupLogin.get('password');
  }

  get usernamereg() {
    return this.formGroupRegistration.get('usernamereg');
  }

  get passwordreg() {
    return this.formGroupRegistration.get('passwordreg');
  }

  get role() {
    return this.formGroupRegistration.get('role');
  }

  get firstName() {
    return this.formGroupRegistration.get('firstName');
  }

  get lastName() {
    return this.formGroupRegistration.get('lastName');
  }

  get phone() {
    return this.formGroupRegistration.get('phone');
  }

  get address() {
    return this.formGroupRegistration.get('address');
  }
}
