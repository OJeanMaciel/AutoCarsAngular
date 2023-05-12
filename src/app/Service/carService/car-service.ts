import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/interface/Car';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  private carsUrl = 'api/cars'; 

  constructor(
    private http: HttpClient
    ) {

  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl);
  }

  getCar(id: string): Observable<Car> {
    const url = `${this.carsUrl}/${id}`;
    return this.http.get<Car>(url);
  }

  getFilteredCars(): Observable<Car[]> {
    const url = `${this.carsUrl}/promotion`;
    return this.http.get<Car[]>(url);
}

addCar(car: Car): Observable<Car> {
  return this.http.post<Car>(this.carsUrl, car);
}

deletarCarro(id: string): Observable<Car> {
  const url = `${this.carsUrl}/${id}`;
  return this.http.delete<Car>(url);
}

updateCar(id: string, updatedCar: Car): Observable<Car> {
  const url = `${this.carsUrl}/${id}`;
  return this.http.put<Car>(url, updatedCar);
}

}