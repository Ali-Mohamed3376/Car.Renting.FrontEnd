import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/Services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent {
  carId: number = 0;
  car: any;
  carCounter: any;
  constructor(
    private rout: ActivatedRoute,
    private readonly service: CarService
  ) {}

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
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
