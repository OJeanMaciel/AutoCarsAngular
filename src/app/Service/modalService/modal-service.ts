import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSubject = new BehaviorSubject<boolean>(false);
  public showModal$ = this.showModalSubject.asObservable();

  constructor() { }

  public showModal(): void {
    this.showModalSubject.next(true);
  }

  public hideModal(): void {
    this.showModalSubject.next(false);
  }
}
