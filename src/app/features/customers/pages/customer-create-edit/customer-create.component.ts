import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { CustomerService } from '../../services/customer.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-create',
  imports: [ReactiveFormsModule, Select, InputTextModule, ButtonModule],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.scss',
})
export class CustomerCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly customerService = inject(CustomerService);
  private readonly messageService = inject(MessageService);
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly config = inject(DynamicDialogConfig);

  saving = signal(false);

  /**
   * create | edit
   */
  readonly mode: 'create' | 'edit' = this.config.data?.mode ?? 'create';

  /**
   * Customer selected for editing.
   * Undefined when creating a new customer.
   */
  readonly customer: Customer | undefined = this.config.data?.customer;

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  get dialogTitle(): string {
    return this.isEditMode ? 'Edit Customer' : 'Add Customer';
  }

  // ============================================
  // Dropdown Options
  // ============================================

  countries: any[] = [];
  cities: any[] = [];
  regions: any[] = [];
  classifications: any[] = [];
  accountManagers: any[] = [];
  businessFields: any[] = [];
  accountTypes: any[] = [];
  paymentProfiles: any[] = [];
  projects: any[] = [];
  units: any[] = [];
  religions: any[] = [];

  clientTypes = [
    {
      label: 'Client',
      value: 'Client',
    },
    {
      label: 'Lead',
      value: 'Lead',
    },
  ];

  customerTypes = [
    {
      label: 'Individual',
      value: 1,
    },
    {
      label: 'Company',
      value: 2,
    },
  ];

  // ============================================
  // Customer Form
  // ============================================

  customerForm = this.fb.group({
    Code: [
      {
        value: '',
        disabled: true,
      },
    ],

    NameAR: ['', Validators.required],
    NameEN: [''],
    Name: [''],

    CommercialName: ['', Validators.required],

    Mobile: [''],
    Phone: [''],
    Fax: [''],

    Email: ['', Validators.email],

    Website: [''],

    CountryId: [null as number | null],
    CityId: [null as number | null],
    RegionId: [null as number | null],

    Address: [''],
    RequestSource: [''],
    Employment: [''],

    Type: [1],

    ClientType: ['Client', Validators.required],

    ClassificationId: [null as number | null],
    AccountManagerId: [null as number | null],
    BusinessFieldId: [null as number | null],
    AccountTypeId: [null as number | null],
    PaymentProfileId: [null as number | null],

    Latitude: [null as number | null],
    Longitude: [null as number | null],

    JobTitle: [''],
    Message: [''],

    InvitedEmployeesIds: [''],

    ProjectId: [0],
    UnitId: [0],

    Religion: [''],
  });

  ngOnInit(): void {
    if (this.isEditMode && this.customer) {
      this.patchCustomerData(this.customer);
    }
  }

  // ============================================
  // Patch Existing Customer
  // ============================================

  private patchCustomerData(customer: any): void {
    this.customerForm.patchValue({
      Code: customer.Code ?? '',

      NameAR: customer.NameAR ?? '',
      NameEN: customer.NameEN ?? '',
      Name: customer.Name ?? '',

      CommercialName: customer.CommercialName ?? '',

      Mobile: customer.Mobile ?? '',
      Phone: customer.Phone ?? '',
      Fax: customer.Fax ?? '',

      Email: customer.Email ?? '',

      Website: customer.Website ?? '',

      CountryId: customer.CountryId ?? null,
      CityId: customer.CityId ?? null,
      RegionId: customer.RegionId ?? null,

      Address: customer.Address ?? '',

      RequestSource: customer.RequestSource ?? '',
      Employment: customer.Employment ?? '',

      Type: customer.Type ?? 1,

      ClientType: customer.ClientType ?? 'Client',

      ClassificationId: customer.ClassificationId ?? null,
      AccountManagerId: customer.AccountManagerId ?? null,
      BusinessFieldId: customer.BusinessFieldId ?? null,
      AccountTypeId: customer.AccountTypeId ?? null,
      PaymentProfileId: customer.PaymentProfileId ?? null,

      Latitude: customer.Latitude ?? null,
      Longitude: customer.Longitude ?? null,

      JobTitle: customer.JobTitle ?? '',
      Message: customer.Message ?? '',

      InvitedEmployeesIds: customer.InvitedEmployeesIds ?? '',

      ProjectId: customer.ProjectId ?? 0,
      UnitId: customer.UnitId ?? 0,

      Religion: customer.Religion ?? '',
    });
  }

  // ============================================
  // Submit
  // ============================================

  submit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();

      this.messageService.add({
        severity: 'warn',
        summary: 'Incomplete Data',
        detail: 'Please complete all required fields.',
      });

      return;
    }

    if (this.saving()) {
      return;
    }

    this.saving.set(true);

    const formValue = this.customerForm.getRawValue();

    /**
     * CREATE
     * Id = 0
     *
     * EDIT
     * Id = existing customer Id
     */
    const payload: any = {
      ...formValue,

      Id: this.isEditMode ? (this.customer?.Id ?? 0) : 0,

      Code: this.isEditMode ? (this.customer?.Code ?? '') : '',
    };

    this.customerService.saveCustomer(payload).subscribe({
      next: (response) => {
        this.saving.set(false);

        if (!response.Result) {
          this.messageService.add({
            severity: 'error',
            summary: 'Operation Failed',
            detail:
              response.ErrorMessage ||
              `Unable to ${this.isEditMode ? 'update' : 'create'} customer.`,
          });

          return;
        }

        this.messageService.add({
          severity: 'success',
          summary: this.isEditMode ? 'Customer Updated' : 'Customer Created',

          detail: this.isEditMode
            ? 'Customer updated successfully.'
            : 'Customer created successfully.',
        });

        this.dialogRef.close({
          success: true,
          mode: this.mode,
          customer: this.isEditMode
            ? {
                ...this.customer,
                ...this.customerForm.getRawValue(),
              }
            : undefined,
        });
      },

      error: () => {
        this.saving.set(false);

        this.messageService.add({
          severity: 'error',
          summary: 'Operation Failed',
          detail: `Something went wrong while ${
            this.isEditMode ? 'updating' : 'creating'
          } the customer.`,
        });
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
