import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './Components/master/master.component';
import { DetailComponent } from './Components/detail/detail.component';
import { HomeComponent } from './Components/home/home.component';
import { CarDetailsComponent } from './Components/car-details/car-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'car/details/:id', component: CarDetailsComponent },
  { path: 'master/:id', component: MasterComponent },
  { path: 'master/cardetails', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
