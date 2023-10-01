import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { navMenuBar } from '../navdata';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() onToogleSideNav: EventEmitter<SideNavToggle> = new EventEmitter
  screenWidth = 0;
  collapsed = false;
  navData = navMenuBar;
  logDet: string;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    let finalMenu = this.navData.filter(a => a.role_flag === 'BOTH' || a.role_flag === localStorage.getItem('role'))
    this.navData = finalMenu;
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }
}
