import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarServiceService } from 'src/app/Service/carService/car-service';
import { Car } from 'src/app/interface/Car';
import { v4 as uuidv4 } from 'uuid';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  car: Car = {
    id: 0,
    marca: '',
    modelo: '',
    cor: '',
    combustivel: '',
    preco: 0,
    ano: 0,
    portas: 0,
    imagem: ''
  };
  
  showPopup = false;
  popupMessage = '';

  constructor(
    private carService: CarServiceService,
    private router: Router
    ) {}

  ngOnInit(): void {}

  submitForm(formData: any): void {
    this.carService.addCar(this.car).subscribe(
      () => {
        this.showPopup = true;
        this.popupMessage = 'Veículo adicionado com Sucesso!';
        setTimeout(() => {
          this.hidePopup();
          this.router.navigate(['/carlist']);
        }, 5000);
      },
      (error) => {
        this.showPopup = true;
        setTimeout(() => {
          this.popupMessage = 'Erro ao cadastrar veículo!' + error;
        }, 5000);
      },
    );
  }

  hidePopup(): void {
    this.showPopup = false;
    this.popupMessage = '';
  }

  maskCurrency(value: string, locale = 'pt-BR', currency = 'BRL'): string {
    const onlyDigits = value.split("").filter(s => /\d/.test(s)).join("").padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(parseFloat(digitsFloat));
  }

  onInputChange(event: any): void {
    event.target.value = this.maskCurrency(event.target.value);
  }
}
