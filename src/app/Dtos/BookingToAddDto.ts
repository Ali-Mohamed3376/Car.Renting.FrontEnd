import { CustomerToAddDto } from './CustomerToAddDto';
import { RntedCarsDto } from './RntedCarsDto';

export class BookingToAddDto {
  RntedCars: RntedCarsDto[] = [];
  customerId: string = '';
  customer?: CustomerToAddDto;
  transactionDate: any;

  // constructor() {
  //   this.customerId = '';
  //   this.transactionDate;
  // }
}
