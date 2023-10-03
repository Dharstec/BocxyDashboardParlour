import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { Store, coordinate } from '../store.model';
declare var google: any;
declare var $: any;
@Component({
  selector: 'app-store-add-edit',
  templateUrl: './store-add-edit.component.html',
  styleUrls: ['./store-add-edit.component.scss']
})
export class StoreAddEditComponent implements OnInit, AfterViewInit {
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
  lat: any;
  long: any;
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
      } else {
        this.form.get('password').disable();
      }
    })
  }

  ngOnInit(): void {
    this.initialize();
    this.form = this.fb.group({
      store_name: ['', Validators.required],
      email: ['', Validators.required],
      co_ordinates: ['', Validators.required],
      phone_no: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      lat: [''],
      long: ['']
    })
  }


  ngAfterViewInit() {
    this.initialize();
  }

  initialize() {
    var input = document.getElementById('autocomplete_search') as HTMLInputElement;
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace();
      // place variable will have all the information you are looking for.
      document.getElementById('lat').setAttribute('value', place.geometry.location.lat().toString());
      document.getElementById('long').setAttribute('value', place.geometry.location.lng().toString());
      this.lat = place.geometry.location.lat().toString();
      this.long = place.geometry.location.lng().toString();
    });
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
      store.store_name = this.form.get('store_name').value;
      store.address = this.form.get('address').value;
      store.phone_no = this.form.get('phone_no').value;
      const ordinates = new coordinate()
      ordinates.lat = this.lat;
      ordinates.long = this.long;
      store.co_ordinates.push(ordinates);
      store.email = this.form.get('email').value;
      store.role_flag = 'STORE_ADMIN';
      store._id = this.storeId ? this.storeId : null;
      store.super_admin_id = localStorage.getItem('superAdminId');
      store.password = this.form.get('password').value;
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

