import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

interface Customer {
  id: string;
  code: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  status: 'Active' | 'Pending';
}

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    ChartModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  kpiStats = [
    {
      title: 'Active Customers',
      value: '1,250',
      icon: 'pi pi-arrow-up-right',
      color: '#2563eb',
    },
    {
      title: 'New Leads',
      value: '340',
      icon: 'pi pi-arrow-up-right',
      color: '#16a34a',
    },
    {
      title: 'Pending Quotations',
      value: '55',
      icon: 'pi pi-arrow-up-right',
      color: '#2563eb',
    },
    {
      title: 'Open Tickets',
      value: '12',
      icon: 'pi pi-ticket',
      color: '#475569',
    },
  ];

  // Customers Table Data
  customers: Customer[] = [
    {
      id: '10',
      code: '020001',
      name: 'Asan Smith',
      email: 'shmeel@customer.com',
      mobile: '990725766',
      city: 'Brazil',
      status: 'Active',
    },
    {
      id: '22',
      code: '020003',
      name: 'Horn Adam',
      email: 'khaled@customer.com',
      mobile: '920326577',
      city: 'Brianon',
      status: 'Pending',
    },
  ];

  // Charts Config
  pieData: any;
  barData: any;
  chartOptions: any;

  ngOnInit() {
    this.pieData = {
      labels: ['API', 'DSA', 'Google', 'Others'],
      datasets: [
        {
          data: [540, 325, 702, 121],
          backgroundColor: ['#2563eb', '#38bdf8', '#f59e0b', '#64748b'],
        },
      ],
    };

    this.barData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Funnel',
          data: [85, 45, 30, 15],
          backgroundColor: '#2563eb',
          borderRadius: 4,
        },
      ],
    };

    this.chartOptions = {
      plugins: { legend: { position: 'right' } },
      responsive: true,
      maintainAspectRatio: false,
    };
  }

  getSeverity(status: string): 'success' | 'warn' {
    return status === 'Active' ? 'success' : 'warn';
  }
}
