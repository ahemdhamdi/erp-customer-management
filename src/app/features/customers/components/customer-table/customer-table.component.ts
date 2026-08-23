import {
  Component,
  Input,
  Output,
  EventEmitter,
  Signal,
  computed,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SkeletonModule } from 'primeng/skeleton';
import { SelectModule } from 'primeng/select';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-table',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    OverlayPanelModule,
    SkeletonModule,
    SelectModule,
  ],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss',
})
export class CustomerTableComponent {
  @Input({ required: true }) customers: any[] = [];
  @Input({ required: true }) loading = false;
  @Input({ required: true }) allColumns: any[] = [];
  @Input({ required: true }) selectedColumns: any[] = [];
  @Input({ required: true }) totalRecords = 0;
  @Input({ required: true }) rows = 10;
  @Input({ required: true }) first = 0;

  @Output() lazyLoad = new EventEmitter<any>();
  @Output() rowsChange = new EventEmitter<number>();
  @Output() refresh = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<{ action: string; customer: any }>();

  @ViewChild('dt') dt!: Table;
  Math = Math;

  trackByCustomerId(index: number, item: any): any {
    return item?.Id || index;
  }

  exportCSV(event: Event) {
    if (this.dt) {
      this.dt.exportCSV();
    } else {
      console.error('Table reference (dt) was not found!');
    }
  }
}
