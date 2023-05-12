import { Component } from '@angular/core';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.scss']
})
export class CarrosselComponent {
  images = [
    { src: './assets/carousel/corolla-2022.png', title: 'Imagem 1' },
    { src: './assets/carousel/honda-civic-2022.png', title: 'Imagem 2' },
    { src: './assets/carousel/vw-golf-r_2022.png', title: 'Imagem 3' }
  ];
  currentImage = this.images[0];
  intervalId: any;

  constructor() {
    this.startInterval();
  }

  prevImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const prevIndex = currentIndex === 0 ? this.images.length - 1 : currentIndex - 1;
    this.currentImage = this.images[prevIndex];
  }

  nextImage() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const nextIndex = currentIndex === this.images.length - 1 ? 0 : currentIndex + 1;
    this.currentImage = this.images[nextIndex];
  }

  startInterval() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 10000);
  }

  stopInterval() {
    clearInterval(this.intervalId);
  }

  ngOnDestroy() {
    this.stopInterval();
  }
}
