import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CarFilterationDto } from 'src/app/Dtos/CarFilterationDto';
import { CarToViewDto } from 'src/app/Dtos/CarToViewDto';
import { CarService } from 'src/app/Services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cars: any;
  brands: any;
  models: any;
  modelYears: any;
  x: number = 1;
  counter: number = this.x + 1;

  @Input()
  datafromHeader: string = '';

  constructor(private service: CarService) {}

  form = new FormGroup({
    modelName: new FormControl<string>(''),
    brandName: new FormControl<string>(''),
    modelYear: new FormControl<number>(0),
  });

  ngOnInit(): void {
    this.GetCars();
    this.GetBrands();
    this.GetModels();
    this.GetModelYears();
  }

  // Get All Cars
  GetCars() {
    this.service.GetAllCars().subscribe({
      next: (data) => {
        this.cars = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Get Brands
  GetBrands() {
    this.service.GetAllBrands().subscribe({
      next: (data) => {
        this.brands = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Get Models
  GetModels() {
    this.service.GetAllModels().subscribe({
      next: (data) => {
        this.models = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Get Model Years
  GetModelYears() {
    this.service.GetAllModelYears().subscribe({
      next: (data) => {
        this.modelYears = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Filteration Proccess
  onSubmit() {
    let filterData = new CarFilterationDto();
    filterData.ModelName = this.form.controls.modelName.value ?? '';
    filterData.BrandName = this.form.controls.brandName.value ?? '';
    filterData.ModelYear = this.form.controls.modelYear.value ?? 0;

    this.service.GetCarsAfterFilteration(filterData).subscribe({
      next: (data) => {
        this.cars = data;
        console.log('dd');
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Reset Filteration
  ResetFilters() {
    this.form.controls.modelName.setValue('');
    this.form.controls.brandName.setValue('');
    this.form.controls.modelYear.setValue(0);
    this.GetCars();
  }

  // Counter
  incrementCounter(): any {
    if (this.counter < 10) {
      return ++this.counter;
    }
  }
}
