import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/interface/Car';
import { CarServiceService } from 'src/app/Service/carService/car-service';
import { ModalService } from 'src/app/Service/modalService/modal-service';

@Component({
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.scss']
})
export class CardetailsComponent implements OnInit {
  car: Car | undefined;

  showPopup = false;
  popupMessage = '';
  showModal: boolean = false;

  constructor(
    private carService: CarServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id') ?? '';
    this.carService.getCar(carId).subscribe((car: Car) => {
      this.car = car;
    });
  }
  
  deletar() {
    const carId = this.route.snapshot.paramMap.get('id')?.toString() ?? '';
    this.carService.deletarCarro(carId).subscribe(
      () => {
        this.showPopup = true;
        this.popupMessage = 'Veículo deletado com Sucesso!';
        setTimeout(() => {
          this.hidePopup();
          this.router.navigate(['/carlist']);
        }, 5000);
      },
      (error) => {
        this.showPopup = true;
        setTimeout(() => {
          this.popupMessage = 'Erro ao deletar veículo!' + error;
        }, 5000);
      },
    );
  }

  hidePopup(): void {
    this.showPopup = false;
    this.popupMessage = '';
  }

  editar() {
    this.modalService.showModal();
    this.showModal = true;
  }
}
