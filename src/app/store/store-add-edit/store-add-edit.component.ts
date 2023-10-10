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
  lat = '';
  long = '';
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

  reverseGeocode(lat: string, long: string) {
    // const geocoder = new google.maps.Geocoder();
    // const latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(long));

    // geocoder.geocode({ 'location': latLng }, (results, status) => {
    //   if (status === 'OK') {
    //     if (results[0]) {
    //       // Access the place information from the first result
    //       const place = results[0];
    //       this.form.controls['co_ordinates'].setValue(place.formatted_address);
    //       this.lat = lat;
    //       this.long = long;
    //       // Access place details like address components, formatted address, etc.
    //       console.log("Formatted Address:", place.formatted_address);
    //       console.log("Address Components:", place.address_components);

    //       // You can use the place information as needed
    //     } else {
    //       console.log('No results found');
    //     }
    //   } else {
    //     console.error('Geocoder failed due to: ' + status);
    //   }
    // });
  }
  getStoreDetails() {
    this.api.apiGetDetailsCall(this.storeId, 'admin/getOneStore').subscribe(data => {
      this.storeDetails = data.data;
      this.form.controls['store_name'].setValue(data.data.store_name);
      this.form.controls['email'].setValue(data.data.email);
      this.form.controls['phone_no'].setValue(data.data.phone_no);
      this.form.controls['address'].setValue(data.data.address);
      this.form.controls['password'].setValue(data.data.password);
      this.reverseGeocode(data.data.co_ordinates[0], data.data.co_ordinates[1])
      if (this.router.url.includes('view')) {
        this.form.disable();
      } else {
        this.form.controls['password'].disable();
      }
    })
  }

  ngOnInit(): void {
    this.loadGoogleMapsAPI();
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

  loadGoogleMapsAPI() {
    // if (typeof google === 'undefined') {
    //   // The Google Maps API hasn't loaded yet, delay and check again
    //   setTimeout(() => this.loadGoogleMapsAPI(), 200);
    // } else {
    //   // The Google Maps API is loaded, initialize your map and geocoder here
    //   this.initialize();
    // }
  }


  initialize() {
    // var input = document.getElementById('autocomplete_search') as HTMLInputElement;
    // var autocomplete = new google.maps.places.Autocomplete(input);
    // autocomplete.addListener('place_changed', () => {
    //   var place = autocomplete.getPlace();
    //   document.getElementById('lat').setAttribute('value', place.geometry.location.lat().toString());
    //   document.getElementById('long').setAttribute('value', place.geometry.location.lng().toString());
    //   this.lat = place.geometry.location.lat().toString();
    //   this.long = place.geometry.location.lng().toString();
    // });
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
      const ordinates = this.form.controls['co_ordinates'].value.split(',').map(parseFloat)
      store.co_ordinates = ordinates;
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

