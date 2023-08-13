import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarFilterationDto } from '../Dtos/CarFilterationDto';
import { CarToViewDto } from '../Dtos/CarToViewDto';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private readonly client: HttpClient) {}

  private readonly GEtCarsURL = 'https://localhost:7136/api/Cars/all_Cars';
  private readonly GEtCarByIdURL = 'https://localhost:7136/api/Cars';
  private readonly GEtCarsFilteredURL =
    'https://localhost:7136/api/Cars/CarFilteration';

  private readonly GetAllBrandsURL = 'https://localhost:7136/api/Cars/Brands';
  private readonly GetAllModelsURL =
    'https://localhost:7136/api/Cars/ModelNames';
  private readonly GetAllModelYearsURL =
    'https://localhost:7136/api/Cars/ModelYears';

  // Get All Cars
  GetAllCars(): Observable<CarToViewDto> {
    return this.client.get<CarToViewDto>(this.GEtCarsURL);
  }

  // Get Car By Id
  GetCarById(id: number) {
    return this.client.get(this.GEtCarByIdURL + '/' + id);
  }

  // Get Cars After Filteration
  GetCarsAfterFilteration(
    credentials: CarFilterationDto
  ): Observable<CarFilterationDto[]> {
    return this.client.post<CarFilterationDto[]>(
      this.GEtCarsFilteredURL,
      credentials
    );
  }

  // Get All Brands
  GetAllBrands() {
    return this.client.get(this.GetAllBrandsURL);
  }

  // Get All Models
  GetAllModels() {
    return this.client.get(this.GetAllModelsURL);
  }

  // Get All Model Years
  GetAllModelYears() {
    return this.client.get(this.GetAllModelYearsURL);
  }
}
