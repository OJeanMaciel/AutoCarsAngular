import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CarServiceService } from 'src/app/Service/carService/car-service';
import { Car } from 'src/app/interface/Car';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() marcas: string[] = [];
  @Output() marcaSelecionada = new EventEmitter<string>();

  cars: Car[] = [];
  filteredCars: Car[] = [];
  filteredModelo: Car[] = [];
  filteredCor: Car[] = [];
  filteredCombustivel: Car[] = [];
  filteredAno: Car[] = [];
  filteredId: Car[] = [];
  marcasUnicas!: string[];
  modeloUnico!: string[];
  corUnica!: string[];
  combustivelUnico!: string[];
  anoUnico!: number[];
  id!: number[];

  selectedMarca: string = '';
  selectedModelo: string = '';
  selectedCor: string = '';
  selectedAno: number = 0;
  selectedCombustivel: string = '';
  carAno: number[] = [];
  carId: number[] = [];
  
  constructor(
    private carService: CarServiceService,
    private router: Router
    ) {}
    
    ngOnInit(): void {
      this.carService.getCars().subscribe(response => {
        this.cars = response;

        this.marcasUnicas = this.cars.map(car => car.marca).filter((value, index, self) => self.indexOf(value) === index);
        this.modeloUnico = this.cars.map(car => car.modelo).filter((value, index, self) => self.indexOf(value) === index);
        this.corUnica = this.cars.map(car => car.cor).filter((value, index, self) => self.indexOf(value) === index);
        this.combustivelUnico = this.cars.map(car => car.combustivel).filter((value, index, self) => self.indexOf(value) === index);
        this.anoUnico = this.cars.map(car => car.ano).filter((value, index, self) => self.indexOf(value) === index);

        
        this.id = this.cars.map(car => car.id).filter((value, index, self) => self.indexOf(value) === index);
        });
    }

    filtrarPorMarca() {
      this.selectedModelo = 'Selecione um modelo';
      this.filteredCars = this.cars.filter(car => car.marca === this.selectedMarca);
      this.modeloUnico = this.filteredCars.map(car => car.modelo).filter((value, index, self) => self.indexOf(value) === index);
    } 

    filtrarPorModelo() {
      this.corUnica = [];
      this.selectedCor = 'Selecione a Cor';
      this.filteredModelo = this.cars.filter(car => car.modelo === this.selectedModelo);
      this.corUnica = this.filteredModelo.map(car => car.cor).filter((value, index, self) => self.indexOf(value) === index);
      if (this.corUnica.length > 0) {
        this.selectedCor = this.corUnica[0];
        this.filtrarPorCor();
      }
    }
    
    filtrarPorCor() {
      this.combustivelUnico = [];
      this.selectedCombustivel = 'Selecione o tipo de combustível';
      this.filteredCor = this.cars.filter(car => car.cor === this.selectedCor);
      this.combustivelUnico = this.filteredCor.map(car => car.combustivel).filter((value, index, self) => self.indexOf(value) === index);
      if (this.combustivelUnico.length > 0) {
        this.selectedCombustivel = this.combustivelUnico[0];
        this.filtrarPorCombustivel();
      }
    }
    
    filtrarPorCombustivel() { 
      this.anoUnico = [];
      this.selectedAno = 0;
      this.filteredCombustivel = this.cars.filter(car => car.combustivel === this.selectedCombustivel);
      this.filteredAno = this.filteredCombustivel.filter(car => car.ano !== this.selectedAno);
      this.anoUnico = this.filteredAno.map(car => car.ano).filter((value, index, self) => self.indexOf(value) === index);
      if (this.anoUnico.length > 0) {
        this.selectedAno = this.anoUnico[0];
        this.filtrarPorAno();
      }
    }
    
    filtrarPorAno() {
      this.selectedAno = 0;
      this.filteredAno = this.filteredCombustivel.filter(car =>
        car.marca === this.selectedMarca &&
        car.modelo === this.selectedModelo &&
        car.cor === this.selectedCor

        );
        this.carAno = this.filteredAno.map(car => car.ano);
    }

    buscar() {
      this.filteredId = this.filteredCombustivel.filter(car =>
        car.marca === this.selectedMarca &&
        car.modelo === this.selectedModelo &&
        car.cor === this.selectedCor
      );
      this.carId = this.filteredId.map(car => car.id);
      this.router.navigate(['/carfilters'], { queryParams: { carId: JSON.stringify(this.carId) } });
    }
}
