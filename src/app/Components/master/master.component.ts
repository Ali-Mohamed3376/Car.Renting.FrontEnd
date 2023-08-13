import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingToAddDto } from 'src/app/Dtos/BookingToAddDto';
import { CustomerNameDto } from 'src/app/Dtos/CustomerNameDto';
import { CustomerToViewDto } from 'src/app/Dtos/CustomerToViewDto';
import { BookingService } from 'src/app/Services/booking.service';
import { CarService } from 'src/app/Services/car.service';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
})
export class MasterComponent implements OnInit {
  carId: any;
  car: any;
  tableData: any[] = [];
  customerId: any;
  CustomerByName: CustomerToViewDto = new CustomerToViewDto();
  LastDataFromChild: any;
  UserNotFound: boolean = false;
  customerResultMessage: string = '';
  credentials: BookingToAddDto = new BookingToAddDto();
  constructor(
    private rout: ActivatedRoute,
    private readonly service: CarService,
    private readonly customerService: CustomerService,
    private readonly bookingService: BookingService,
    private route: Router
  ) {}

  // Reactive Form
  form = new FormGroup({
    transactionDate: new FormControl<Date>(new Date(), Validators.required),
    customerName: new FormControl<string>('', Validators.required),
    customerNationality: new FormControl<string>(
      'Egyptian',
      Validators.required
    ),
    customerDrivingLicenseNo: new FormControl<string>('', Validators.required),
    advancedPayment: new FormControl('', Validators.required),
  });

  // To Get Id For Car
  ngOnInit(): void {
    this.rout.params.subscribe((params) => {
      this.carId = params['id'];
    });

    this.GetCarDetails();
  }

  // Get Car Details
  GetCarDetails() {
    this.service.GetCarById(this.carId).subscribe({
      next: (data) => {
        this.car = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Get Customer By Name
  GetCustomerByName(name: any) {
    this.customerService.GetCustomerByName(name).subscribe({
      next: (data) => {
        this.CustomerByName = data;
        console.log('this is this.credentials.customer');
        this.credentials.customer = data;
        this.credentials.customerId = data.id;
      },
      error: (error) => {
        this.customerResultMessage = 'User ' + error.error.title;
        console.log(error);
      },
    });
  }

  // Show Detail Data Child
  ShowDetailDataChild() {
    let child = document.getElementById('child') as HTMLElement;
    child.style.display = 'block';
    let openBTN = document.getElementById('openCarDetailsData') as HTMLElement;
    openBTN.style.display = 'none';
  }

  // Receive Data From DetailComponent
  RecevieDataFromDetail(data: any) {
    this.tableData.push(data);
    console.log(this.tableData);
  }

  // Delete Selected Car
  DeletSelectedCar(row: any) {
    let tbody = document.getElementById('tbody') as HTMLElement;
    tbody.removeChild(row);
    console.log(tbody);
    console.log(row);
  }

  //Confirm Booking
  CollectAllData() {
    // First Get User by Name and store him to Database
    let customerName = new CustomerNameDto();
    customerName.name = this.form.controls.customerName.value ?? '';
    customerName.nationality =
      this.form.controls.customerNationality.value ?? '';
    customerName.advancedPayment =
      this.form.controls.advancedPayment.value ?? '';
    customerName.drivingLicenseNo =
      this.form.controls.customerDrivingLicenseNo.value ?? '';
    this.GetCustomerByName(customerName);

    this.credentials.transactionDate =
      this.form.controls.transactionDate.value ?? '';
    this.credentials.RntedCars = this.tableData;

    this.bookingService.Booking(this.credentials).subscribe({
      next: (data) => {
        console.log('Success');
        console.log(data);
        this.route.navigateByUrl('/');
        window.alert('Your Order Booking Successfully');
      },
      error: (e) => {
        console.log('Failed');
        console.log(e);
      },
    });
    console.log(this.credentials);
  }
}
