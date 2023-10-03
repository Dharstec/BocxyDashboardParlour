import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { environment } from 'src/environments/environment';
import { marketsList } from '../markets.modal';
const API_URL = environment.apiUrl;

@Component({
  selector: 'app-marketing-add-edit',
  templateUrl: './marketing-add-edit.component.html',
  styleUrls: ['./marketing-add-edit.component.scss']
})
export class MarketingAddEditComponent implements OnInit {
  form: FormGroup;
  sendVia = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Whatsapp', value: 'whatsApp' },
  ];
  targetCustomer = [
    { label: 'All Customers', value: 'allcustomer' },
    { label: 'Male Only', value: 'maleOnly' },
    { label: 'Female Only', value: 'femaleOnly' }
  ]
  selectedFile: File = null;
  selectedFileName = '';

  submitted = false;
  file: any;
  edit=false;
  marketId: string;
  marketsDetails:any;
  constructor(private api: ApiService, private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(params => {
      this.marketId=params.get('id');
      if (this.marketId) {
        this.edit=true;
        const marketsEdit = {
          _id:this.marketId
        }
        this.api.apiPostCall(marketsEdit, 'marketing/getOneMarketing').subscribe(data => {
          this.form.patchValue(data.data)
          this.marketsDetails=data.data;
          this.form.get('addMedia').patchValue(data.data.addMedia.split('/').slice(-1)[0])
        })
      }
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      campanignTitle: ['', Validators.required],
      yourContent: ['', Validators.required],
      addMedia: [''],
      targetCustomer: ['', Validators.required],
      sendVia: ['', Validators.required],
    })
  }

  onSelectFileClick() {
    const fileInput = document.querySelector('.file-input') as HTMLElement;
    fileInput.click();
  }
  onChange(event) {
    this.selectedFileName = event.target.files[0].name;
    this.file = 'files/' + event.target.files[0].name;
  }

  discard(){
    if(this.marketId){
      this.form.patchValue(this.marketsDetails);
      this.form.get('addMedia').patchValue(this.marketsDetails.addMedia.split('/').slice(-1)[0])
    }else{
      this.form.reset();
    }
    this.router.navigate(['/marketing/list'])
  }

  saveCampaign(): void {
    if (this.form.invalid) {
      this.submitted = true;
      return
    } else {
      this.submitted = false;
      const marketsAdd = new marketsList()
      marketsAdd._id = this.marketId?this.marketId:null;
      marketsAdd.campanignTitle = this.form.get('campanignTitle').value;
      marketsAdd.yourContent = this.form.get('yourContent').value;
      marketsAdd.addMedia = API_URL + (this.file ? this.file :'files/'+this.form.get('addMedia').value);
      marketsAdd.targetCustomer = this.form.get('targetCustomer').value;
      marketsAdd.sendVia = this.form.get('sendVia').value;
      if(this.marketId){
        this.api.apiPutCall(marketsAdd, 'marketing/updateMarketing').subscribe(data => {
          if (data.message.includes('Updated Marketing Successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: data.message,
            });
            this.router.navigate(['/marketing/list'])
          }
        }, (error) => {
          if (error) {
            this.form.reset();
          }
        })
      }else{
        this.api.apiPostCall(marketsAdd, 'marketing/createMarketing').subscribe(data => {
          if (data.message.includes('Created Successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: data.message,
            });
            this.router.navigate(['/marketing/list'])
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
