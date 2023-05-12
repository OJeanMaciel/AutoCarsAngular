import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarlistComponent } from './pages/carlist/carlist.component';
import { CardetailsComponent } from './pages/cardetails/cardetails.component';
import { RegisterComponent } from './pages/register/register.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { CarfiltersComponent } from './pages/carfilters/carfilters.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: 'carlist', pathMatch: 'full' },
  { path: 'carlist', component: CarlistComponent },
  { path: 'carlist/:id', component: CardetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'carfilters', component: CarfiltersComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '**', component: Page404Component },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }