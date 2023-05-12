import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { CarlistComponent } from './pages/carlist/carlist.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { CarrosselComponent } from './components/carrossel/carrossel.component';
import { CardetailsComponent } from './pages/cardetails/cardetails.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { CarfiltersComponent } from './pages/carfilters/carfilters.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SobreComponent } from './pages/sobre/sobre.component';
import { Page404Component } from './pages/page404/page404.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    CarlistComponent,
    RegisterComponent,
    CarrosselComponent,
    CardetailsComponent,
    PromotionsComponent,
    CarfiltersComponent,
    ModalEditComponent,
    SobreComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
