import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  customerList: any;
  noData: boolean;
  logDet: any;

  constructor(private api: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.getCustomerList();
    this.logDet = JSON.parse(localStorage.getItem('details'));
    console.log(this.logDet)
  }

  getCustomerList(): void {
    this.api.apiGetCall('customer/getAllCustomer').subscribe((data) => {
      this.customerList = data.data;
      if (!data.data?.length) {
        this.noData = true;
      }
    })
  }
  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = "head-md-screen"
    }
    return styleClass;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

