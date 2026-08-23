import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer, CustomerApiResponse } from '../models/customer.model';
import { catchError, Observable, of } from 'rxjs';
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
} from '../models/customer-create.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private http = inject(HttpClient);
  private baseUrl = 'https://testmobapi.erppluscloud.com/api/CRM';

  getCustomers(searchText: string = ''): Observable<CustomerApiResponse> {
    const params = new HttpParams()
      .set('Text', searchText)
      .set('Direction', 'ltr')
      .set('InCT', '');

    return this.http
      .get<CustomerApiResponse>(`${this.baseUrl}/ReadAllCRMClients`, { params })
      .pipe(
        catchError((error) => {
          console.error('API Error:', error);
          return of({ Data: [], Total: 0 });
        }),
      );
  }
  

  saveCustomer(
    payload: CreateCustomerRequest,
    inCT: string = '',
  ): Observable<CreateCustomerResponse> {
    const params = new HttpParams().set('InCT', inCT);

    return this.http.post<CreateCustomerResponse>(
      `${this.baseUrl}/SaveCustomerWithContactPerson`,
      payload,
      { params },
    );
  }
}
