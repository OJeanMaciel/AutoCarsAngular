import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarServiceService } from 'src/app/Service/carService/car-service';
import { Car } from 'src/app/interface/Car';

@Component({
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.scss']
})
export class CarlistComponent implements OnInit {
  cars: Car[] = [];
  pageNumber: number = 1;
  selectedOrder: string = '';

  constructor(
    private carService: CarServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(response => {
      this.cars = response;
    });
  }
  
  orderBy() {
    let sortedCars = [...this.cars];
    switch (this.selectedOrder) {
      case 'Marca':
        sortedCars.sort((a, b) => (a.marca > b.marca) ? 1 : -1);
        break;
      case 'Modelo':
        sortedCars.sort((a, b) => (a.modelo > b.modelo) ? 1 : -1);
        break;
      case 'Ano':
        sortedCars.sort((a, b) => (a.ano > b.ano) ? 1 : -1);
      break;
      case 'Preco':
        sortedCars.sort((a, b) => (a.preco > b.preco) ? 1 : -1);
        break;
      default:
        break;
    }
    this.cars = sortedCars;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
