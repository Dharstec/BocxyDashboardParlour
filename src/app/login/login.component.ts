import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SnackbarComponent } from '../shared-module/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  edit = false;
  hide = true;

  constructor(private fb: FormBuilder, private router: Router, private api: ApiService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    } else {
      this.submitted = false;
      const payload = {
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value
      }

      this.api.apiPostCall(payload, 'admin/login').subscribe(data => {
        if (data.token) {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: 'User loggedIn Successfully',
          });
          if (data.data['role_flag'] === 'SUPER_ADMIN') {
            localStorage.setItem('superAdminId', data.data['_id']);
            this.router.navigate(['/analytic'])
          } else if(data.data['role_flag'] === 'STORE_ADMIN') {
            localStorage.setItem('superAdminId', data.data['super_admin_id'])
            localStorage.setItem('storeId',data.data['_id'])
            this.router.navigate(['/analytic'])
          }else if(data.data['role_flag'] === 'BOCXY_ADMIN'){
            localStorage.setItem('superAdminId', data.data['_id']);
            this.router.navigate(['/customers/list'])
          }else {
            localStorage.setItem('superAdminId', data.data['_id']);
            localStorage.setItem('storeId',data.data['_id'])
            this.router.navigate(['/analytic'])
          }
          localStorage.setItem('role', data.data['role_flag']);
          localStorage.setItem('details', JSON.stringify(data.data));
        } else {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: 'Failed to Login',
          });
        }
      },error=>{
        console.log(error)
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: error.message,
        });
      })
    }
  }
}