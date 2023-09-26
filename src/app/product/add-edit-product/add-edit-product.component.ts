import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { couponsList } from 'src/app/coupons/coupons.model';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  types: string[] = [
    "Affiliate",
    "In Store",
  ];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  couponsDetails: any;
  constructor(private api: ApiService, private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(params => {
      this.couponId = params.get('id');
      if (this.couponId && this.router.url.includes('edit')) {
        this.edit = true;
        this.getCouponDetails();
      } else if (this.router.url.includes('view')) {
        this.view = true;
        this.getCouponDetails();
      }
    })
  }

  getCouponDetails() {
    this.api.apiGetDetailsCall(this.couponId, 'Coupon/findCoupon').subscribe(data => {
      this.couponsDetails=data.data;
      this.form.patchValue(data.data);
      if (this.router.url.includes('view')) {
        this.form.disable();
      }
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      createdFor: ['', Validators.required],
      couponName: ['', Validators.required],
      description: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      type: ['', Validators.required],
      totalQuantity: ['', Validators.required],
      limit: ['', Validators.required],
      validDateTill: ['', Validators.required],
      // totalCommissions: ['', Validators.required],
      // totalOrders: ['', Validators.required],
      // totalSales: ['', Validators.required],
      // remaining: ['', Validators.required]
    })
  }

  discard(){
    if(this.couponId){
      this.form.patchValue(this.couponsDetails);
    }else{
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
      const CouponsAdd = new couponsList()
      CouponsAdd._id = this.couponId ? this.couponId : null;;
      CouponsAdd.createdFor = this.form.get('createdFor').value;
      CouponsAdd.couponName = this.form.get('couponName').value;
      CouponsAdd.description = this.form.get('description').value;
      CouponsAdd.type = this.form.get('type').value;
      CouponsAdd.discountPercentage = this.form.get('discountPercentage').value;
      CouponsAdd.totalQuantity = this.form.get('totalQuantity').value;
      CouponsAdd.limit = this.form.get('limit').value;
      CouponsAdd.validDateTill = this.form.get('validDateTill').value;

      // couponName:req.body.couponName,
      // totalQuantity:req.body.totalQuantity,
      // availedQuantity: req.body.availedQuantity,
      // createdFor:req.body.createdFor,
      // totalOrders:req?.body?.totalOrders || 0,
      // totalSales:req?.body?.totalSales || 0,
      // totalCommissions:req?.body?.totalCommissions || 0,
      // createdDate:req.body.createdDate,
      // validDateTill:req.body.validDateTill,
      // discountPercentage:req.body.discountPercentage,
      // type:req.body.type,
      // description:req.body.description,
      // remaining:req.body.remaining

      // CouponsAdd.totalCommissions = this.form.get('totalCommissions').value;
      // CouponsAdd.totalOrders = this.form.get('totalOrders').value;
      // CouponsAdd.totalSales = this.form.get('totalSales').value;
      // CouponsAdd.availedQuantity = this.form.get('availedQuantity')?.value ? this.form.get('availedQuantity').value : '0';
      // CouponsAdd.remaining = this.form.get('remaining')?.value;
      if (this.couponId) {
        this.api.apiPutCall(CouponsAdd, 'Coupon/updateCoupon').subscribe(data => {
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
        this.api.apiPostCall(CouponsAdd, 'Coupon/createCoupon').subscribe(data => {
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

