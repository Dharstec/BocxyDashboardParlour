import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { couponsList } from 'src/app/coupons/coupons.model';
import { AddProduct } from 'src/app/inventory/add-product/add-product.model';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  editproduct: any;
  productview = false;
  changename: any;
  changetheproductName: any
  @ViewChild('fileInput') fileInput: ElementRef;
  videoSelect = false;
  mainImageSrc: string;
  apiMainImageSrc: string;
  images: Array<string> = [];
  apiMainImages: Array<string> = [];
  video: string;
  apiVideoUrl: string;
  submitted = false;
  noImage = "assets/no_found.jpeg"
  types: string[] = [
    "Male",
    "Female",
    "Neutral"
  ];
  category = [
    "Haircare products",
    "Skincare products",
    "Nailcare products",
    "Cosmetics",
    "Makeup",
    "Fragrance",
    "Serums",
    "Sunscreens"
  ]
  brand = [
    'LOréal',
    'Maybelline',
    'MAC',
    'Lakme',
    'Wella',
    'Toni & Guy',
    'TRESemmé',
    'Renee'
  ]
  color = [
    "Liquid",
    "Stick",
    "Cream",
    "Balm",
    "Gel"]
  avgCustomerRating = [
    "4 stars & above",
    "3 stars & above",
    "2 stars & above",
    "1 star & above"
  ]
  collections = [
    "Diwali", "New Year", "Mother's Day", "Christmas", "Raksha Bandhan", "Eid", "Holi", "Durga pooja", ""
  ]
  productId: string;
  edit = false;
  view = false;
  uploadEnabled: boolean = true;
  result: any;
  productDetails: any;
  isSave = false;

  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private api: ApiService, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      console.log(this.productId)
      if (this.productId && this.router.url.includes('edit')) {
        this.edit = true;
        this.getProductDetails();
      } else if (this.router.url.includes('view')) {
        this.view = true;
        this.getProductDetails();
      }

    })
  }

  ngOnInit(): void {
    this.initializeForm();
    if (!this.productId) {
      this.mainImageSrc = this.noImage;
      this.generateRandomString();
    }
  }

  generateRandomString(): string {
    const characters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    this.result = "";

    for (let i: number = 0; i < 12; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      this.result += characters.charAt(randomIndex);
    }

    return this.result;
  }



  getProductDetails() {
    this.api.apiGetDetailsCall(this.productId, 'product/getOneProduct').subscribe(data => {
      this.productDetails = data.data;
      this.form.patchValue(data.data);
      this.form.controls['for'].setValue(data.data.gender)
      this.mainImageSrc = this.productDetails?.productImages[0];
      this.images = this.productDetails?.productImages;
      this.video = this.productDetails?.productVideos[0];
      if (this.router.url.includes('view')) {
        this.form.disable();
      }
    })

  }
  allFiles: any;
  onFileChange(event: any) {
    const files = event.target.files;
    this.allFiles = event.target.files
    if (files.length > 0) {
      const file = files[0];
      if (file) {
        this.handleImageVideoUpload(file);
      }
    }
  }
  handleImageVideoUpload(file: File) {
    const reader = new FileReader();
    // if (!this.uploadEnabled) {
    //   return;
    // }

    // if (this.images.length >= 4 && !this.video) {
    //   console.log("You can only upload four images and one video.");
    //   this.uploadEnabled = false;
    //   return;
    // }

    // if (this.images.length === 4 && this.video) {
    //   this.uploadEnabled = false;
    // }

    if (this.allFiles && this.allFiles[0]) {
      const numberOfFiles = this.allFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (e.target.result.includes('image/')) {
            this.images.push(e.target.result);
            this.mainImageSrc = this.images[0];
          } else {
            // const videoElement = document.createElement('video');
            // videoElement.preload = 'metadata';
            // videoElement.onloadedmetadata = () => {
            //   window.URL.revokeObjectURL(videoElement.src);
            //   if (videoElement.duration < 5 || videoElement.duration > 30) {
            //     this.snackbar.openFromComponent(SnackbarComponent, {
            //       data:"Video duration should be between 10 and 30 seconds.",
            //     });
            //     return;
            //   }
            this.video = e.target.result;
            //   this.videoSelect=true;
            // };
            // videoElement.src = URL.createObjectURL(file);
          }

        }
        reader.readAsDataURL(this.allFiles[i]);
      }
    }
  }

  selectImage(image: string) {
    this.mainImageSrc = image;
    this.videoSelect = false;
  }
  selectVideo(video: string) {
    this.videoSelect = true;
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    if (!this.images.length) {
      this.mainImageSrc = this.noImage;
    }
  }

  removeVideo() {
    this.video = "";
  }

  clearFileInput() {
    this.fileInput.nativeElement.value = '';
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      productName: ['', Validators.required], //bc name 
      discountPrice: ['', Validators.required],
      actualPrice: ['', Validators.required],
      description: ['', Validators.required],
      // stock: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      formulation: ['', Validators.required],
      avgCustomerRating: ['', Validators.required],
      for: ['', Validators.required],
      gift: [true],
      personalised: [true],
      latest: [true],
      collections: ['', Validators.required],
      viewedBy: [''],
      noOfViews: [''],
      noOfSales: [''],
      productAge: [''],
      referenceId: ['', Validators.required],
    })
  }

  discard() {
    if (this.productId) {
      this.form.patchValue(this.productDetails);
    } else {
      this.form.reset();
    }
    this.router.navigate(['/product/list'])
  }


  save(): void {
    this.form.setValidators(null);
    this.form.updateValueAndValidity();
    // && this.allFiles?.length !== 5
    if (this.form.invalid) {
      console.log(this.form)
      this.submitted = true;
      // if(!this.allFiles.includes('video')){

      // }
      // this.snackbar.openFromComponent(SnackbarComponent, {
      //   data: data.message,
      // });

      return
    } else {
      this.submitted = false;
      this.isSave = true;
      const formData = new FormData()
      if (this.allFiles && this.allFiles.length) {
        for (let img of this.allFiles) {
          formData.append('files', img)
        }
      }

      this.api.apiPostCall(formData, 'Product/createProductImages').subscribe(data => {
        if (data.message.includes('Image Added Successfully')) {
          const addProd = new AddProduct()
          addProd._id = this.productId ? this.productId : null
          addProd.superAdminId = localStorage.getItem('superAdminId');
          addProd.productName = this.form.get('productName')?.value;
          addProd.discountPrice = this.form.get('discountPrice')?.value;
          addProd.actualPrice = this.form.get('actualPrice')?.value;
          addProd.description = this.form.get('description')?.value;
          addProd.category = this.form.get('category')?.value;
          addProd.gender = this.form.get('for')?.value;
          addProd.brand = this.form.get('brand')?.value;
          addProd.formulation = this.form.get('formulation')?.value;
          addProd.avgCustomerRating = this.form.get('avgCustomerRating')?.value;
          addProd.gift = this.form.get('gift')?.value;
          addProd.personalised = this.form.get('personalised')?.value;
          addProd.latest = this.form.get('latest')?.value;
          addProd.collections = this.form.get('collections')?.value;
          addProd.viewedBy = this.form.get('viewedBy')?.value;
          addProd.noOfViews = this.form.get('noOfViews')?.value;
          addProd.noOfSales = this.form.get('noOfSales')?.value;
          addProd.productAge = this.form.get('productAge')?.value;
          addProd.referenceId = this.form.get('referenceId')?.value;
          addProd.barcode = this.productId ? this.productDetails.barcode : this.result;
          addProd.imageArray = data.data.imageArray ? data.data.imageArray : [];
          addProd.videoArray = data.data.videoArray ? data.data.videoArray : [];
          if (this.productId) {
            this.api.apiPutCall(addProd, 'Product/updateProduct').subscribe(data => {
              if (data.message.includes('Successfully')) {
                this.isSave = false;
                this.snackbar.openFromComponent(SnackbarComponent, {
                  data: data.message,
                });
                this.router.navigate(['/product/list'])
              }
            }, (error) => {
              if (error) {
                this.isSave = false;
                // this.form.reset();
              }
            })
          } else {
            this.api.apiFormDataPostCall(addProd, 'product/createProduct').subscribe(data => {
              if (data.message.includes('Successfully')) {
                this.snackbar.openFromComponent(SnackbarComponent, {
                  data: data.message,
                });
                this.router.navigate(['/product/list'])
              }
            }, (error) => {
              if (error) {
                // this.form.reset();
              }
            })
          }
        }
      })

    }
  }
}