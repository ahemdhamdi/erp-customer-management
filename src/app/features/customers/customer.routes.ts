import { Routes } from '@angular/router';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/customer-list/customer-list.component')
        .then(m => m.CustomerListComponent)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/customer-create-edit/customer-create.component')
        .then(m => m.CustomerCreateComponent)
  }
];