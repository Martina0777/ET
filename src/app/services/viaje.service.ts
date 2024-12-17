import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  private viajeSeleccionado: any = null;

  setViajeSeleccionado(viaje: any): void {
    this.viajeSeleccionado = viaje;
  }

  getViajeSeleccionado(): any {
    return this.viajeSeleccionado;
  }
}
