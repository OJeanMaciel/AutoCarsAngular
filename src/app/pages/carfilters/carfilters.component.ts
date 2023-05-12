import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarServiceService } from 'src/app/Service/carService/car-service';
import { Car } from 'src/app/interface/Car';

@Component({
  templateUrl: './carfilters.component.html',
  styleUrls: ['./carfilters.component.scss']
})
export class CarfiltersComponent implements OnInit {
  cars: Car[] = [];
  pageNumber: number = 1;
  selectedOrder: string = '';
  carId: number[] = [];

  constructor(
    public carService: CarServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carId = JSON.parse(String(this.route.snapshot.queryParamMap.get('carId'))) || [];
    console.log(this.carId);

    this.carService.getCars().subscribe(response => {
      this.cars = response.filter(car => this.carId.includes(car.id));
  });
  }
  
  navigate(route: string) {
    this.router.navigate([route]);
  }
}
