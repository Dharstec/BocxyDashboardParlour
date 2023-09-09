import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ProductdetailsService } from 'src/app/services/productdetails.service';
class ImageSnippet {
  pending: boolean;
  status: string;
  constructor(public src: string, public file: File) { }
}

class VideoSnippet {
  pending: boolean;
  status: string;
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  productResult: any;
  productForm: UntypedFormGroup;
  editproduct: any;
  productview: any = false;
  hideButton: any = false;
  changename: any;
  changetheproductName: any
  selectedFile: ImageSnippet;
  selectedvideosFile: VideoSnippet;
  // imageSrc: string = '';
// video:string='\assets\istockphoto-1309628270-640_adpp_is.mp4'
  // videoplayer: any;

  constructor(private productDetails: ProductdetailsService, private route: ActivatedRoute, private router: Router, private formBuilder: UntypedFormBuilder, private api: ApiService) { }

  ngOnInit(): void {

    let product = this.productDetails.getdata()
    this.productResult = product.data
    console.log(this.productResult);// data tables 
    this.addProductform(this.productResult)
    this.productview = this.productResult ? true : false
    this.hideButton = product.type == 'view' ? true : false
    this.changename = this.route.queryParams.subscribe((result) => {
      const data = result.type;
      console.log(data);
      if (data == 'addProduct') {
        this.changetheproductName = 'Add Product'
        this.editproduct = true
      }
      else if (data == 'editProduct') {
        console.log("edit data", data);

        this.changetheproductName = "Edit Product"
        this.editproduct = false

      }
      else {
        this.changetheproductName = "View Product"

      }
    })
    // this.sub = this.route.params.subscribe((params) => {
    //   const data: params.data;
    // });
  }
  addProductform(row) {
    this.productForm = this.formBuilder.group({
      productName: [row && row.productName ? row.productName : null,], //bc name 
      discountPrice: [row && row.discountPrice ? row.discountPrice : null,],
      actualPrice: [row && row.actualPrice ? row.actualPrice : null,],
      description: [row && row.description ? row.description : null,],
      for: [row && row.for ? row.for : null,],
      _id: [row && row._id ? row._id : null,],
      stock: [row && row.stock ? row.stock : null,],
      category: [row && row.category ? row.category : null,],
      stone: [row && row.stone ? row.stone : null,],
      colour: [row && row.colour ? row.colour : null,],
      style: [row && row.style ? row.style : null,],
      referenceId: [row && row.referenceId ? row.referenceId : null]

    })
  }


  addProductData() {
    if (this.changetheproductName == 'Add Product') {
      let form = this.productForm.getRawValue()
      let body = {
        "productName": form.productName,
        // "productImage":form.productImage,
        "discountPrice": Number(form.discountPrice),
        "actualPrice": Number(form.actualPrice),
        "description": form.description,
        "category": form.category,
        "stone": form.stone,
        "colour": form.colour,
        "referenceId": Number(form.referenceId),
        "style": form.style,
        "stock": Number(form.stock),
        "for": form.for,

      }
      this.api.createProductData(body).subscribe((result) => {
        console.log(result);
        alert("add product succesfully");
        window.location.reload();
      })
      return this.router.navigate(['dashboard/inventory'])

    }
    else {
      this.editproduct = !this.editproduct
    }

  }

  //edit ==> form group
  editProductData() {
    // this.editproduct = !this.editproduct
    if (this.changetheproductName == 'Edit Product') {
      let form = this.productForm.getRawValue()
      let body = {
        "_id": form._id,
        "productName": form.productName,
        "discountPrice": form.discountPrice,
        "actualPrice": form.actualPrice,
        "description": form.description,
        "stock": form.stock,
        "category": form.category,
        "stone": form.stone,
        "colour": form.colour,
        "style": form.style,
        "for": form.for

      }
      this.api.updateProduct(body).subscribe((res) => {
        console.log(res);
        alert("edit product succesfully");

        window.location.reload();

      })

      return this.router.navigate(['dashboard/inventory'])

    }

  }
    proccessimgupload(imageInput:any){
      let form = this.productForm.getRawValue()
      const file:File = imageInput.files[0];
      const reader = new FileReader(); 
      reader.addEventListener('load',(event:any)=>{
        // debugger;
     this.selectedFile= new ImageSnippet(event.target.result, file,)
     let body = {
      "_id": form._id,
      "productImages":this.selectedFile.src
    }
     console.log(this.selectedFile.src);
    //  debugger;
     this.api.updateProduct(body).subscribe((res)=>{
      console.log(res);
      
     },(err)=>{
      console.log(err);
      
     })
      });
      reader.readAsDataURL(file);
    }
    onFileSelected(videoInput:any){
      let form = this.productForm.getRawValue()
      const file:File = videoInput.files[0];
      const reader = new FileReader(); 
      reader.addEventListener('load',(event:any)=>{
        debugger;
     this.selectedFile= new VideoSnippet(event.target.result, file,)
     let body = {
      "_id": form._id,
      "productVideos":this.selectedFile.src
    }
     console.log(this.selectedFile.src);
     debugger;
     this.api.updateProduct(body).subscribe((res)=>{
      console.log(res);
      
     },(err)=>{
      console.log(err);
      
     })
      });
      reader.readAsDataURL(file);
    }
    // onFileSelected(event:any){
    //   console.log(event);
      
    //   let form = this.productForm.getRawValue()
    //   // const file:File = event.files[0];
    //   const file:File = event.target.files[0].name
    //   console.log(file);
    //  let body = {
    //   "_id": form._id,
    //   "productVideos":file
    // }
    // //  debugger;
    //  this.api.updateProduct(body).subscribe((res)=>{
    //   console.log(res);
      
    //  },(err)=>{
    //   console.log(err);
      
    //  })
    // }
  //   toggleVideo(event: any) {
  //     console.log(event);
      
  //     this.videoplayer.nativeElement.play();
  // }
}
