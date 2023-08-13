export class CustomerToViewDto {
  id: string;
  name: string;
  nationality: string;
  drivingLicenseNo: string;
  advancedPayment: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.nationality = '';
    this.drivingLicenseNo = '';
    this.advancedPayment = '';
  }
}
