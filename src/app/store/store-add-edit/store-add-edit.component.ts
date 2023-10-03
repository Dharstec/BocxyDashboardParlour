import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { couponsList } from 'src/app/coupons/coupons.model';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { Store } from '../store.model';

@Component({
  selector: 'app-store-add-edit',
  templateUrl: './store-add-edit.component.html',
  styleUrls: ['./store-add-edit.component.scss']
})
export class StoreAddEditComponent implements OnInit {
  form: FormGroup;
  types: string[] = [
    "Affiliate",
    "In Store",
  ];
  submitted = false;
  edit = false;
  storeId: string;
  view = false;
  storeDetails: any;
  constructor(private api: ApiService, private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(params => {
      this.storeId = params.get('id');
      if (this.storeId && this.router.url.includes('edit')) {
        this.edit = true;
        this.getStoreDetails();
      } else if (this.router.url.includes('view')) {
        this.view = true;
        this.getStoreDetails();
      }
    })
  }

  getStoreDetails() {
    this.api.apiGetDetailsCall(this.storeId, 'admin/getOneStore').subscribe(data => {
      this.storeDetails = data.data;
      this.form.patchValue(data.data);
      if (this.router.url.includes('view')) {
        this.form.disable();
      }
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      storeName: ['', Validators.required],
      email: ['', Validators.required],
      co_ordinates: ['', Validators.required],
      phoneNo: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  discard() {
    if (this.storeId) {
      this.form.patchValue(this.storeDetails);
    } else {
      this.form.reset();
    }
    this.router.navigate(['/store/list'])
  }

  saveCoupons(): void {
    if (this.form.invalid) {
      this.submitted = true;
      return
    } else {
      this.submitted = false;
      const store = new Store()
      store.store_name = this.form.get('storeName').value;
      store.address = this.form.get('address').value;
      store.phone_no = this.form.get('phoneNo').value;
      store.co_ordinates = this.form.get('co_ordinates').value;
      store.email = this.form.get('email').value;
      store.password = this.form.get('password').value;
      store.role_flag='STORE_ADMIN';
      if(!this.storeId){
        store.role_flag = 'STORE_ADMIN';
        store.super_admin_id = localStorage.getItem('superAdminId');  
      }

      if (this.storeId) {
        this.api.apiPutCall(store, 'admin/updateStoreAdmin').subscribe(data => {
          if (data.message.includes('Successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: data.message,
            });
            this.router.navigate(['/store/list'])
          }
        }, (error) => {
          if (error) {
            this.form.reset();
          }
        })
      } else {
        this.api.apiPostCall(store, 'admin/createStoreAdmin').subscribe(data => {
          if (data.message.includes('Created Successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: data.message,
            });
            this.router.navigate(['/store/list'])
          }
        }, (error) => {
          if (error) {
            this.form.reset();
          }
        })
      }
    }
  }
}

