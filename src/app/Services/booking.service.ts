import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingToAddDto } from '../Dtos/BookingToAddDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private client: HttpClient) {}

  private readonly URL = 'https://localhost:7136/api/Booking/Add  ';

  // Booking Process
  Booking(body: BookingToAddDto): Observable<any> {
    return this.client.post(this.URL, body);
  }
}
