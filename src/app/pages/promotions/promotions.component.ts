import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarServiceService } from 'src/app/Service/carService/car-service';
import { Car } from 'src/app/interface/Car';

@Component({
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent {
  cars: Car[] = [];
  marcas: string[] = [];
  marcaSelecionada: string = '';
  pageNumber: number = 1;
  selectedOrder: string = '';

  constructor(
    private carService: CarServiceService,
    private router: Router
    ) {}

  ngOnInit() {
    this.getCheaperCars();
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
      case 'Preco':
        sortedCars.sort((a, b) => (a.preco > b.preco) ? 1 : -1);
        break;
      case 'Cor':
        sortedCars.sort((a, b) => (a.cor > b.cor) ? 1 : -1);
      break;
      default:
        break;
    }
    this.cars = sortedCars;
  }

  getCheaperCars() {
    this.carService.getFilteredCars().subscribe(response => {
      this.cars = response;
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  get filteredCars() {
    return this.marcaSelecionada ?
      this.cars.filter(car => car.marca === this.marcaSelecionada) :
      this.cars;
  }
}