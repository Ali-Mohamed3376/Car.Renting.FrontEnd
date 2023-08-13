import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RntedCarsDto } from 'src/app/Dtos/RntedCarsDto';
import { CarService } from 'src/app/Services/car.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  models: any;
  carId: any;
  selectedCar: any;
  @Output() dataEvent = new EventEmitter<any>();

  constructor(private service: CarService) {}
  ngOnInit(): void {
    this.GetModels();
  }

  form = new FormGroup({
    carName: new FormControl<string>('', Validators.required),
    quantityOfCars: new FormControl<number>(0, Validators.required),
    rentDuration: new FormControl<Date>(new Date(), Validators.required),
  });

  // Get Models
  GetModels() {
    this.service.GetAllModels().subscribe({
      next: (data) => {
        this.models = data;
        console.log(this.models);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  sendId(s: any) {
    this.carId = s.value;
  }
  //Send Data To Maste
  SendDataToMaster() {
    let data = new RntedCarsDto();
    data.carId = this.selectedCar.carId;
    data.carName = this.selectedCar.name;
    data.quantityOfCars = this.form.controls.quantityOfCars.value ?? 0;
    data.rentDuration = this.form.controls.rentDuration.value;
    console.log(data);
    this.dataEvent.emit(data);
  }
}
