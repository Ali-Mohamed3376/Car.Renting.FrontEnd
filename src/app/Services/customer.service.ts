import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerToViewDto } from '../Dtos/CustomerToViewDto';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private client: HttpClient) {}

  private readonly GetUserByNameURL =
    'https://localhost:7136/api/Customer/GetUserByName';

  // Get Customer By Name
  GetCustomerByName(name: any): Observable<any> {
    return this.client.post(this.GetUserByNameURL, name);
  }
}
