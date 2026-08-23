import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { CustomerService } from '../../services/customer.service';
import { Customer, CustomerApiResponse } from '../../models/customer.model';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CustomerTableComponent } from '../../components/customer-table/customer-table.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CustomerCreateComponent } from '../customer-create-edit/customer-create.component';

export interface Column {
  field: string;
  header: string;
}

export interface CustomerFilters {
  Id: string;
  Code: string;
  Name: string;
  Email: string;
  Mobile: string;
  ClientType: string;
  AccountManager: string;
  City: string;
  Country: string;
}

@Component({
  selector: 'app-customer-list',
  imports: [
    FormsModule,
    SkeletonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
    MultiSelectModule,
    MenuModule,
    OverlayPanelModule,
    CustomerTableComponent,
    DynamicDialogModule,
  ],
  providers: [DialogService],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent {
  displayedCustomers = signal<any[]>([]);
  allCustomers = signal<any[]>([]);
  filteredCustomers = signal<any[]>([]); // النتيجة بعد الفلترة
  globalSearchText = signal<string>('');
  showFilterPanel = signal<boolean>(false);
  totalRecords = signal<number>(0);
  loading = signal<boolean>(false);
  first = signal<number>(0);
  rows = signal<number>(5);


  

  @ViewChild(CustomerTableComponent) tableComponent!: CustomerTableComponent;

  private readonly dialogService = inject(DialogService);
  private readonly customerService = inject(CustomerService);

  private dialogRef?: DynamicDialogRef;



  allColumns: Column[] = [
    { field: 'Id', header: 'ID' },
    { field: 'Code', header: 'Code' },
    { field: 'CommercialName', header: 'Name' },
    { field: 'Email', header: 'Email' },
    { field: 'Mobile', header: 'Mobile' },
    { field: 'ClientType', header: 'Client Type' },
    { field: 'AccountManagerName', header: 'Account Manager' },
    { field: 'CityName', header: 'City' },
    { field: 'CountryName', header: 'Country' },
  ];

  selectedColumns: Column[] = [...this.allColumns];

  filterModel = signal<CustomerFilters>({
    Id: '',
    Code: '',
    Name: '',
    Email: '',
    Mobile: '',
    ClientType: '',
    AccountManager: '',
    City: '',
    Country: '',
  });

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globalSearchText.set(value);
    this.onFilterChange();
  }

  toggleFilter() {
    this.showFilterPanel.update((v) => !v);
  }

  onFilterChange() {
    this.filterSubject.next({ ...this.filterModel() });
  }

  clearAllFilters() {
    this.filterModel.set({
      Id: '',
      Code: '',
      Name: '',
      Email: '',
      Mobile: '',
      ClientType: '',
      AccountManager: '',
      City: '',
      Country: '',
    });
    this.onFilterChange();
  }

  removeColumn(colToRemove: Column, event: Event) {
    event.stopPropagation();
    this.selectedColumns = this.selectedColumns.filter(
      (col) => col.field !== colToRemove.field,
    );
  }

  exportCSV(event: Event) {
    if (this.tableComponent) {
      this.tableComponent.exportCSV(event);
    }
  }

  loadCustomersLazy(event: TableLazyLoadEvent) {
    const currentFirst = event.first ?? 0;
    const currentRows = event.rows ?? this.rows();
    this.first.set(currentFirst);
    this.rows.set(currentRows);
    this.updatePageData(currentFirst, currentRows);
  }

  onRowsChange(newRows: number) {
    this.rows.set(newRows);
    this.first.set(0); // العودة للصفحة الأولى عند تغيير عدد العناصر
    this.updatePageData(0, newRows);
  }

  refreshData() {
    this.first.set(0);
    this.loadAllData();
  }

  private filterSubject = new Subject<CustomerFilters>();

  ngOnInit() {
    this.setupFilterPipeline();
    this.loadAllData();
  }

  trackByCustomerId(index: number, item: Customer): number {
    return item.Id;
  }

  private setupFilterPipeline() {
    this.filterSubject

      .pipe(
        debounceTime(250),
        switchMap((filters: CustomerFilters) => {
          const sourceData = this.allCustomers();
          if (!sourceData || sourceData.length === 0) {
            return of([]);
          }
          const query = this.globalSearchText().toLowerCase().trim();
          // 2. دالة مساعدة لتصفية الفلاتر التفصيلية
          const match = (itemVal: any, filterVal: string) => {
            if (!filterVal || filterVal.trim() === '') return true;
            if (itemVal === null || itemVal === undefined) return false;
            return itemVal
              .toString()
              .toLowerCase()
              .includes(filterVal.trim().toLowerCase());
          };

          const results = sourceData.filter((item) => {
            const matchesGlobal =
              !query ||
              Object.values(item).some(
                (val) =>
                  val !== null &&
                  val !== undefined &&
                  val.toString().toLowerCase().includes(query),
              );

            const matchesDetailed =
              match(item.Id || item.id, filters.Id) &&
              match(item.Code || item.code, filters.Code) &&
              match(
                item.CommercialName || item.Name || item.name,

                filters.Name,
              ) &&
              match(item.Email || item.email, filters.Email) &&
              match(item.Mobile || item.mobile, filters.Mobile) &&
              match(item.ClientType || item.clientType, filters.ClientType) &&
              match(
                item.AccountManagerName || item.accountManagerName,
                filters.AccountManager,
              ) &&
              match(item.CityName || item.cityName, filters.City) &&
              match(item.CountryName || item.countryName, filters.Country);

            return matchesGlobal && matchesDetailed;
          });
          return of(results);
        }),
      )
      .subscribe({
        next: (filteredList) => {
          this.filteredCustomers.set(filteredList);
          this.totalRecords.set(filteredList.length);
          this.first.set(0);
          this.updatePageData(0, this.rows());
        },
      });
  }

  private updatePageData(first: number, rows: number) {
    const sliced = this.filteredCustomers().slice(first, first + rows);

    this.displayedCustomers.set(sliced);
  }

  loadAllData() {
    this.loading.set(true);

    this.customerService.getCustomers().subscribe({
      next: (res) => {
        const data = res.Data || res || [];
        this.allCustomers.set(data);
        this.filteredCustomers.set(data);
        this.totalRecords.set(data.length);
        this.updatePageData(0, this.rows());
        this.loading.set(false);
      },

      error: () => this.loading.set(false),
    });
  }

  handleAction(event: { action: string; customer: any }) {
    console.log(`Action trigger: ${event.action}`, event.customer);
  }

  getActionItems(): MenuItem[] {
    return [
      { label: 'View Profile', icon: 'pi pi-user' },

      { label: 'Edit', icon: 'pi pi-pencil' },

      { label: 'Delete', icon: 'pi pi-trash', styleClass: 'text-red-500' },
    ];
  }

  onAction(type: string, customer: Customer) {
  switch (type) {
    case 'view':
      break;

    case 'edit':
      this.openEditCustomer(customer);
      break;

    case 'delete':
      break;
  }
}

  onSectionAction(actionType: string) {
    switch (actionType) {
      case 'collectiveReassign':
        console.log('Open Collective Reassign Modal/Template');
        break;
      case 'customerFollowUp':
        console.log('Open Customer Follow Up Modal/Template');
        break;
      case 'uploadBulk':
        console.log('Open Upload Bulk Modal/Template');
        break;
    }
  }

  openAddCustomerDialog() {
    this.dialogRef = this.dialogService.open(CustomerCreateComponent, {
      header: 'Add Customer',
      width: '80vw',
      modal: true,
      closable: true,
      breakpoints: {
        '960px': '85vw',
        '640px': '95vw',
      },
      contentStyle: {
        overflow: 'auto',
      },
    });

    this.dialogRef.onClose.subscribe((result) => {
      if (result?.success) {
        this.refreshData();
      }
    });
  }

  openEditCustomer(customer: Customer) {
  this.dialogRef = this.dialogService.open(CustomerCreateComponent, {
    header: 'Edit Customer',
    width: '90vw',
    modal: true,

    data: {
      customer,
      mode: 'edit',
    },

    breakpoints: {
      '960px': '85vw',
      '640px': '95vw',
    },

    contentStyle: {
      overflow: 'auto',
    },
  });

  this.dialogRef.onClose.subscribe((result) => {
    if (result?.success) {
      this.refreshData();
    }
  });
}
}
