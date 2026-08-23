import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  badge?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  activeItem: string = 'Customer';

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-th-large', routerLink: '/dashboard' },
    { label: 'Customer', icon: 'pi pi-user', routerLink: '/customers', badge: true },
    { label: 'Potential Request', icon: 'pi pi-users', routerLink: '' },
    { label: 'Quotation', icon: 'pi pi-calculator', routerLink: '' },
    { label: 'Sales Order', icon: 'pi pi-shopping-bag', routerLink: '' },
    { label: 'Tickets', icon: 'pi pi-ticket', routerLink: '' }
  ];

  selectItem(item: MenuItem) {
    this.activeItem = item.label;
  }
}
