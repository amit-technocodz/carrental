import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AgencylayoutComponent } from "./agencylayout/agencylayout.component";
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { AdminAuthGuard } from '../app/guards/admin.guard';
import { AgencyAuthGuard } from '../app/guards/Agency.guard';
import { UserGuard } from '../app/guards/user.guard';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'login', loadChildren: './login/login.module#LoginModule' }
    ]
  },
  {
    path: 'admin', component: AdminlayoutComponent, canActivateChild: [AdminAuthGuard], children: [
      { path: '', loadChildren: './deshboard/deshboard.module#DeshboardModule' },
      { path: 'deshboard', loadChildren: './deshboard/deshboard.module#DeshboardModule' },
      { path: 'AddCarType', loadChildren: './add-car/add-car.module#AddCarModule' },
      { path: 'country', loadChildren: './country/country.module#CountryModule' },
      { path: 'city', loadChildren: './city/city.module#CityModule' },
      {path:'locality',loadChildren:'./locality/locality.module#LocalityModule'},
      {path:'carmake',loadChildren:'./carmake/carmake.module#CarmakeModule'},
      {path:'carmodel',loadChildren:'./carmodel/carmodel.module#CarmodelModule'},
      {path:'carregistration',loadChildren:'./car-registration/car-registration.module#CarRegistrationModule'},
      {path:'carrentalprice',loadChildren:'./carrentalprice/carrentalprice.module#CarrentalpriceModule'},
      {path:'carrental',loadChildren:'./carrental/carrental.module#CarrentalModule'},
      { path: 'caravailability', loadChildren:'./car-availability/car-availability.module#CarAvailabilityModule' }

    ]
  },
  {
    path: 'agency', component: AgencylayoutComponent, canActivateChild: [AgencyAuthGuard], children: [
      { path: '', loadChildren: './agencydeshboard/agencydeshboard.module#AgencydeshboardModule' },
      { path: 'agencydeshboard', loadChildren: './agencydeshboard/agencydeshboard.module#AgencydeshboardModule' }


    ]
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
