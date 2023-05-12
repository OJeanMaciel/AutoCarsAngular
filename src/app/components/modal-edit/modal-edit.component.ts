import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarServiceService } from 'src/app/Service/carService/car-service';
import { ModalService } from 'src/app/Service/modalService/modal-service';
import { Car } from 'src/app/interface/Car';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
  @Input() public showModal: boolean = false;
  car: Car | undefined;

  constructor(
    private carService: CarServiceService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id') ?? '';
    this.carService.getCar(carId).subscribe((car: Car) => {
      this.car = car;
    });
  }

  public hideModal(): void {
    this.showModal = false;
    this.modalService.hideModal();
  }

  updateCar() {
    if (this.car) {
      this.carService.updateCar(this.car.id.toString(), this.car)
        .subscribe(data => {
          console.log(data);
          this.showModal = false;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/carlist']);
          });
        }, error => console.log(error));
    }
  }
}
